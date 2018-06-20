import React, {Component} from 'react';
import './Measurements.css';
import ROSLIB from 'roslib';
import Depth from './Depth';

function calculateDepth(pressure) {

}

class Measurements extends Component {
    constructor(props) {
        super(props);
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.state = {
            pressure: null,
        };
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/sensors/pressure',
            messageType: 'sensor_msgs/FluidPressure',
        });
        this.topic.subscribe(this.handlePressureMsg)
    }

    handlePressureMsg = (msg) => {
        this.setState({pressure: msg.data})
    };

    render() {
        const {pressure} = this.state;

        return (
            <div id="healthCheck">
                <Depth pressure={pressure}/>
            </div>
        );
    }
}

export default Measurements;