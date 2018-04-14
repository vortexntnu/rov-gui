import React from 'react';
import ROSLIB from 'roslib';
import './HealthIndicator.css'

class HealthIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'connected': false
        };
        this.ros = new ROSLIB.Ros({
            'url': 'ws://localhost:9090'
        });
        this.topic = new ROSLIB.Topic({
            ros: this.ros,
            name: this.props.topicName,
            messageType: 'std_msgs/String'
        });
    }

    componentWillMount() {
        this.topic.subscribe((msg) => {
            console.log(msg);
            this.setState({
                "connected": true,
            });
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.setState({
                "connected": false,
            }), 400);
        });
    }

    componentWillUnmount() {
        this.topic.unsubscribe();
        clearTimeout(this.timeout);
    }

    currentState = () => this.state.connected
        ? <span className='connected'>Connected</span>
        : <span className='not-connected'>Not connected</span>;

    render() {
        return (
            <div id="healthCheck">
                <span>{this.props.item}:</span>
                <span>{this.currentState()}</span>
            </div>
        )
    }
}

export default HealthIndicator;