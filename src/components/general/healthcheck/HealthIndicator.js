import React from 'react';
import ROSLIB from 'roslib';

class HealthIndicator extends React.Component {
    constructor(props) {
        super(props);
        this.timeout = null;
        this.state = {
            "connected": false,
        }
    }

    componentWillMount() {
        let listener = new ROSLIB.Topic({
            "ros": this.props.ros,
            "name": this.topic,
            "messageType": 'std_msgs/String',
        });

        listener.subscribe((message) => {
            this.setState({
                "connected": true,
            });
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.setState({
                "connected": false,
            }, 1000));
            console.log('Received message on ' + listener.name + ': ' + message.data);
        });
    }

    render() {
        return (
            <div id="healthCheck">
                <div>{this.props.item}:</div>
                <div>{this.state.connected.toString()}</div>
            </div>
        )
    }
}

export default HealthIndicator;