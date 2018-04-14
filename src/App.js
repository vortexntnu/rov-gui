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
        this.state = {
            "rosIsConnected": true,
        };

        this.ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });
    }

    componentWillMount() {
        this.ros.on('connection', () => {
            console.log('Connected to websocket server.');
            this.setState({"rosIsConnected": true});
        });

        this.ros.on('close', () => {
            console.log('Connection to websocket server closed.');
            this.setState({"rosIsConnected": false});
        });
    }

    render() {
        return (
            <div id="App">
                {this.state.rosIsConnected ? <Tab id="Tab" panes={panes}/> : <RosError/>}
            </div>
        );
    }
}

export default App;
