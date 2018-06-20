import React, {Component} from 'react';
import './Depth.css';
import ROSLIB from 'roslib';

function calculateDepth(pressure) {

}

class Depth extends Component {
    constructor(props) {
        super(props);
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.state = {
            depth: null,
        };
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/sensors/pressure',
            messageType: 'sensor_msgs/FluidPressure',
        });
        this.topic.subscribe(this.handlePressureMsg)
    }

    handlePressureMsg = (msg) => {

    };

    render() {
        return (
            <div>
                <div>hei</div>
            </div>
        );
    }
}

export default Depth;