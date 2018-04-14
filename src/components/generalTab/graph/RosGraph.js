import React from 'react';
import ROSLIB from 'roslib';
import {LineChart} from 'react-easy-chart';
import update from 'immutability-helper';

class RosGraph extends React.Component {
    constructor(props) {
        super(props);
        this.ros = new ROSLIB.Ros({
            'url': 'ws://localhost:9090'
        });
        this.topic = new ROSLIB.Topic({
            ros: this.ros,
            name: this.props.topicName,
            messageType: 'std_msgs/Float64'
        });

        this.state = {
            'data': [[]],
            'num': 100,
        }
    }

    componentWillMount() {
        this.topic.subscribe(this.rosHandler);
        this.interval = setInterval(this.rosSpammer, 50);
    }

    componentWillUnmount() {
        this.topic.unsubscribe();
        clearInterval(this.interval);
    }

    rosHandler = (num) => {
        this.setState(update(this.state, {
            'data': {0: {$push: [num.data]}}
        }));
        this.setState((prevState) => ({
            'num': prevState.num + 1,
        }));
    };

    rosSpammer = () => {
        this.topic.publish({"data": Math.random() * 20});
    };

    render() {
        return (
            <LineChart
                interpolate={'cardinal'}
                grid
                axes
                xDomainRange={[this.state.num - 100, this.state.num]}
                yDomainRange={[0, 20]}
                width={500}
                heigth={800}
                data={this.state.data}/>
        )
    }
}

export default RosGraph;