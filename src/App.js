import React, {Component} from 'react';
import './App.css';
import ROSLIB from 'roslib';
import RosError from './components/RosError';
import Connecting from './components/Connecting';
import {Tab} from 'semantic-ui-react';
import GeneralTab from './components/general-tab/GeneralTab';
import ObsTab from './components/obs-tab/ObsTab';
import AircraftIdTab from './components/aircraft-id-tab/AircraftIdTab';
import SearchZoneTab from './components/search-zone-tab/SearchZoneTab';
import LiftbagTab from './components/liftbag-tab/LiftbagTab';
import PowerCalculatorTab from './components/power-calculator/PowerCalculatorTab';

const panes = [
    {menuItem: 'General', render: () => <GeneralTab/>},
    {menuItem: 'OBS', render: () => <ObsTab/>},
    {menuItem: 'Aircraft identification', render: () => <AircraftIdTab/>},
    {menuItem: 'Search zone', render: () => <SearchZoneTab/>},
    {menuItem: 'Liftbag-release', render: () => <LiftbagTab/>},
    {menuItem: 'Power calculator', render: () => <PowerCalculatorTab/>},
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
        this.connectToRosbridge();
    }

    connectToRosbridge = () => {
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});

        ros.on('connection', () => {
            clearTimeout(this.reconnectionTimer);
            console.log('Connected to websocket server.');
            this.setState({isConnectedToRosbridge: true});
        });

        ros.on('close', () => {
            console.log('Connection to websocket server closed.');
            this.setState({isConnectedToRosbridge: false});
            this.reconnectionTimer = setTimeout(() => this.connectToRosbridge(), 500);
        });

        const isRovAliveTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/is_alive',
            messageType: 'std_msgs/Empty'
        });
        this.refreshAliveTimeout();
        isRovAliveTopic.subscribe(this.stillAlive);
    };

    refreshAliveTimeout = () => {
        clearTimeout(this.aliveTimeout);
        this.aliveTimeout = setTimeout(this.die, 1000);
    };

    stillAlive = () => {
        const connectedToRov = this.state.isConnectedToRov;

        this.refreshAliveTimeout();
        if(!connectedToRov) {
            this.setState({isConnectedToRov: true});
        }
    };

    die = () => {
        const connectedToRov = this.state.isConnectedToRov;

        if(connectedToRov) {
            this.setState({isConnectedToRov: false});
        }
    };

    gui = () => {
        const {isConnectedToRosbridge, isConnectedToRov} = this.state;

        if(!isConnectedToRosbridge) {
            return <Connecting/>
        } else if(!isConnectedToRov) {
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
