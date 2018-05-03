import React, {Component} from 'react';
import './App.css';
import ROSLIB from 'roslib';
import RosError from './components/RosError';
import Connecting from './components/Connecting';
import {Tab} from 'semantic-ui-react';
import GeneralTab from './components/generalTab/GeneralTab';
import ObsTab from './components/obsTab/ObsTab';
import AircraftIdTab from './components/aircraftIdTab/AircraftIdTab';

const panes = [
    {menuItem: 'General', render: () => <Tab.Pane><GeneralTab/></Tab.Pane>},
    {menuItem: 'OBS', render: () => <Tab.Pane><ObsTab/></Tab.Pane>},
    {menuItem: 'Aircraft identification', render: () => <Tab.Pane><AircraftIdTab/></Tab.Pane>},
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnectedToRosbridge: false,
            isConnectedToRov: true,
        };
    }

    componentDidMount() {
        const ros = new ROSLIB.Ros({'url': 'ws://localhost:9090'});
        this.connectToRosbridge(ros);
        const isRovAliveTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/isAlive',
            messageType: 'std_msgs/Empty'
        });
        this.refreshAliveTimeout();
        isRovAliveTopic.subscribe(this.stillAlive);
    }

    refreshAliveTimeout = () => {
        clearTimeout(this.aliveTimeout);
        this.aliveTimeout = setTimeout(this.die, 1000);
    };

    stillAlive = () => {
        this.refreshAliveTimeout();
        this.setState({isConnectedToRov: true});
    };

    die = () => this.setState({isConnectedToRov: false});

    connectToRosbridge = (ros) => {
        ros.on('connection', () => {
            clearTimeout(this.reconnectionTimer);
            console.log('Connected to websocket server.');
            this.setState({isConnectedToRosbridge: true});
        });

        ros.on('close', () => {
            console.log('Connection to websocket server closed.');
            this.setState({isConnectedToRosbridge: false});
            this.reconnectionTimer = setTimeout(() => this.connectToRosbridge(ros), 500);
        });
    };

    gui = () => {
        if(!this.state.isConnectedToRosbridge) {
            return <Connecting/>
        } else if(!this.state.isConnectedToRov) {
            return <RosError/>
        } else {
            return <Tab id="Tab" panes={panes}/>
        }

    };

    render() {
        return (
            <div id="App">
                {this.gui()}
            </div>
        );
    }
}

export default App;
