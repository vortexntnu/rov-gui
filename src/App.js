import React, {Component} from 'react';
import './App.css';
import ROSLIB from 'roslib';
import RosError from './components/RosError';
import {Tab} from 'semantic-ui-react';
import GeneralTab from './components/generalTab/GeneralTab';
import ObsTab from './components/obsTab/ObsTab';

const panes = [
    {menuItem: 'General', render: () => <Tab.Pane><GeneralTab/></Tab.Pane>},
    {menuItem: 'OBS', render: () => <Tab.Pane><ObsTab/></Tab.Pane>},
    {menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>},
];

class App extends Component {
    constructor(props) {
        super(props);
        this.ros = null;
        this.state = {
            "rosIsConnected": true,
        };
    }

    componentDidMount() {
        this.connectToRos()
    }

    connectToRos = () => {
        const ros = new ROSLIB.Ros({
            'url': 'ws://localhost:9090',
        });

        ros.on('connection', () => {
            clearTimeout(this.reconnectionTimer);
            console.log('Connected to websocket server.');
            this.setState({'rosIsConnected': true});
        });

        ros.on('close', () => {
            console.log('Connection to websocket server closed.');
            this.setState({'rosIsConnected': false});
            this.reconnectionTimer = setTimeout(() => this.connectToRos(), 500);
        });
    };

    render() {
        return (
            <div id="App">
                {this.state.rosIsConnected ? <Tab id="Tab" panes={panes}/> : <RosError/>}
            </div>
        );
    }
}

export default App;
