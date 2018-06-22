import React, {Component} from 'react';
import './CameraTilt.css';
import {Input, Button} from 'semantic-ui-react';
import ROSLIB from 'roslib';

class CameraTilt extends Component {
    constructor(props) {
        super(props);
        this.state = {tiltInput: ""};
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/camera_position',
            messageType: 'std_msgs/Float64',
        });
    }

    setTilt = () => {
        let tilt = parseFloat(this.state.tiltInput);
        if(!isNaN(tilt)) {
            if(tilt > 1) {
                tilt = 1;
            }
            if(tilt < -1) {
                tilt = -1;
            }
            this.topic.publish({data: tilt});
        }
    };

    changeTiltInput = (event) => {
        this.setState({tiltInput: event.target.value});
    };


    render() {
        return (
            <div id='camera-tilt'>
                <h3>Camera tilt</h3>
                <Input onChange={this.changeTiltInput} placeholder='from -1 to 1'/>
                <Button onClick={this.setTilt}>Set tilt</Button>
            </div>
        )
    }
}

export default CameraTilt;