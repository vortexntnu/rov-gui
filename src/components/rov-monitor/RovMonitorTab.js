import React, {Component} from 'react';
import './RovMonitorTab.css'
import {Tab} from 'semantic-ui-react';
import ROSLIB from 'roslib';
import Device from './Device';

const testList = [
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
    {
        header: '',
        ip: '192.168.819.230',
        type: 'Camera',
        leak: 0,
        cpu_temp: 65,
    },
];

class RovMonitorTab extends Component {
    constructor(props) {
        super(props);
        this.state = {devices: []};
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/device_list',
            messageType: 'DeviceList'
        });
        this.topic.subscribe(this.handleRos);
    }

    handleRos = (msg) => {
        console.log(msg);
        this.setState({devices: msg.data.devices})
    };

    render() {
        const {devices} = this.state;
        return (
            <Tab.Pane id='rov-monitor'>
                <div className='device-grid'>
                    {devices.map((device, i) => <Device key={i} device={device}/>)}
                    {[1,1,1,1,1,1,1,1,1,1].map((d, i) => <div key={i} className='filler-card'/>)}
                </div>
            </Tab.Pane>
        );
    }
}

export default RovMonitorTab;