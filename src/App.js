import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ROSLIB from 'roslib';
import RosError from './components/RosError';
import Gui from './components/Gui';
import { Tab } from 'semantic-ui-react'

const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "rosIsConnected": true,
        };

        this.ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });
        /*


        let listener = new ROSLIB.Topic({
            ros: ros,
            name: '/test',
            messageType: 'std_msgs/String'
        });

        listener.subscribe((message) => {
            this.setState({
                "text": message.data,
            });
            console.log('Received message on ' + listener.name + ': ' + message.data);
        });*/
    }

    componentWillMount() {
        this.ros.on('connection', () => {
            console.log('Connected to websocket server.');
            this.setState({"rosIsConnected": true});
        });

        this.ros.on('error', (error) => {
            console.log('Error connecting to websocket server: ', error);
        });

        this.ros.on('close', () => {
            console.log('Connection to websocket server closed.');
            this.setState({"rosIsConnected": false});
        });


    }

    render() {
        return (
            <div className="App">
                {this.state.rosIsConnected ? <Tab panes={panes} /> : <RosError />}
            </div>
        );
    }
}

export default App;
