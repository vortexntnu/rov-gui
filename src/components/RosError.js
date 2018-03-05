import React from 'react';
import './RosError.css'

const RosError = () => {
    return (
        <div id='ros-error'>
            <div>
                <h1>ROS is not connected!</h1>
                <h2>Run: <code>$ rosbridge_server rosbrigde_websocket.launch</code></h2>
                <h2>and restart GUI</h2>
            </div>
        </div>
    )
};

export default RosError;