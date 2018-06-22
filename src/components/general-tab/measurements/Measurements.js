import React, {Component} from 'react';
import './Measurements.css';
import ROSLIB from 'roslib';
import Depth from './Depth';

class Measurements extends Component {
    constructor(props) {
        super(props);

        if(window.pressure !== undefined) {
            this.state = {pressure: window.pressure};
        } else {
            this.state = {pressure: null};
        }

        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/sensors/pressure',
            messageType: 'sensor_msgs/FluidPressure',
        });
        this.topic.subscribe(this.handlePressureMsg)
    }

    handlePressureMsg = (msg) => {
        this.setState({pressure: msg.fluid_pressure});
        window.pressure = msg.fluid_pressure;
        console.log(msg);
    };

    render() {
        const {pressure} = this.state;

        return (
            <div>
                <h3>Sensor data</h3>
                <Depth pressure={pressure}/>
            </div>
        );
    }
}

export default Measurements;