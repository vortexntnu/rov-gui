import React, {Component} from 'react';
import './LiftbagTab.css';
import BigRedButton from '../common/big-red-button/BigRedButton';
import ROSLIB from 'roslib';

class LiftbagTab extends Component {
    componentDidMount() {
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/liftbag_release',
            messageType: 'std_msgs/String',
        });
    }

    componentWillUnmount() {
        this.topic.unsubscribe();
    }

    render() {
        return <div id="liftbag-tab"><BigRedButton onClick={() => this.topic.publish({data: 'Release'})} text="Release"/></div>
    }
}

export default LiftbagTab;
