import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ROSLIB from 'roslib';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          "text": "YOyo"
        };
        console.log(ROSLIB);
        let ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });

        ros.on('connection', function () {
            console.log('Connected to websocket server.');
        });
        ros.on('error', function (error) {
            console.log('Error connecting to websocket server: ', error);
        });
        ros.on('close', function () {
            console.log('Connection to websocket server closed.');
        });


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
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p className="App-intro">
                    {this.state.text}
                </p>
            </div>
        );
    }
}

export default App;
