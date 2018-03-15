import React from 'react';
import './RosError.css'

const RosError = () => {
    return (
        <div id='ros-error'>
            <div>
                <h1>ROS is not connected!</h1>
                <h2>Run:</h2>
                <h2><code>$ sudo apt-get install ros-kinetic-rosbridge-suite</code></h2>
                <h2><code>$ roslaunch rosbridge_server rosbrigde_websocket.launch</code></h2>
                <h2>and restart GUI</h2>
            </div>
        </div>
    )
};

export default RosError;