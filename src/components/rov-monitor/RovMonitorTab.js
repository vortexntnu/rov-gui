import React, {Component} from 'react';
import './RovMonitorTab.css'
import {Tab} from 'semantic-ui-react';
import ROSLIB from 'roslib';

class RovMonitorTab extends Component {
    constructor(props) {
        super(props);
        this.state = {devices: []};
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '',
            messageType: ''
        });
        this.topic.subscribe(this.handleRos);
    }

    handleRos = (msg) => {
        console.log(msg);
        this.setState({devices: msg.data.devices})
    };

    render() {
        return (
            <Tab.Pane id='rov-monitor'>RovMonitorTab works!</Tab.Pane>
        );
    }
}

export default RovMonitorTab;