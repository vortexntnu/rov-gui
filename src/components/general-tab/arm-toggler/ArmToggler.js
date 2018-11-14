import React, {Component} from 'react';
import {Checkbox} from 'semantic-ui-react';
import ROSLIB from 'roslib';
import './ArmToggler.css';

class ArmToggler extends Component {
    constructor(props) {
        super(props);
        this.state = {isArmed: false};
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/mcu_arm',
            messageType: 'std_msgs/String',
        });
    }

    handleClick = () => {
        const {isArmed} = this.state;
        if(isArmed) {
            this.setState({isArmed: false});
            this.topic.publish({data: 'ben'});
        } else {
            this.setState({isArmed: true});
            this.topic.publish({data: 'arm'})
        }
    };

    render() {
        const {isArmed} = this.state;
        return (
            <div id='arm-toggler'>
                <h3>Arm components</h3>
                <div className='component'>
                    <h4>Thrusters</h4>
                    <Checkbox toggle active={isArmed} onClick={this.handleClick}/>
                </div>
            </div>
        )
    }
}

export default ArmToggler;