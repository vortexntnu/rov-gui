import React, {Component} from 'react';
import ROSLIB from 'roslib';
import './HealthIndicator.css'

class HealthIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {connected: false};
    }

    componentDidMount() {
        const ros = new ROSLIB.Ros({url: 'ws://localhost:9090'});
        const topicName = '/general/healthcheck/' + this.props.item.toLowerCase();

        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: topicName,
            messageType: 'std_msgs/Empty'
        });

        this.topic.subscribe((msg) => {
            this.setState({connected: true});
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.setState({connected: false}), 500);
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
                <span>{this.props.item}: </span>
                <span>{this.currentState()}</span>
            </div>
        )
    }
}

export default HealthIndicator;