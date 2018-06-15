import React from 'react';
import './Device.css';
import {Card} from 'semantic-ui-react';

/*

# Serves as heartbeat and continuous device monitoring

Header header # Primarly for timestamp
string id # Device serial number
string ip # Ethernet IP adress
string type # Device type, eg. camera, manipulator, etc
int8 leak # 0 for no leak, 1 for leak, -1 for data unavailable
int8 cpu_temp # -1 for data unavailable

*/

function leakStatus(leak) {
    if(leak === 1) {
        return <div className='leak'>LEAK!</div>;
    } else if(leak === 0) {
        return <div className='no-leak'>None</div>;
    } else {
        return <div className='leak-unknown'>Unknown</div>;
    }
}

const Device = ({device}) => {
    const {ip, type, leak, cpu_temp} = device;
    return (
        <Card>
            <Card.Content>
                <Card.Header>{ip}</Card.Header>
                <div className='row'>
                    <div>Type:</div>
                    <div>{type}</div>
                </div>
                <div className='row'>
                    <div>CPU-temperature:</div>
                    <div>{cpu_temp}</div>
                </div>
                <div className='row'>
                    <div>Leak</div>
                    {leakStatus(leak)}
                </div>
            </Card.Content>
        </Card>
    )
};

export default Device;
