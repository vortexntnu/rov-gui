import React from 'react';
import './RosError.css'

const RosError = () => {
    return (
        <div id='ros-error'>
            <div>
                <h1>ROS is not connected!</h1>
                <h2>Run:</h2>
                <h2><span className="unselectable">$ </span><code>sudo apt-get install ros-kinetic-rosbridge-suite</code></h2>
                <h2><span className="unselectable">$ </span><code>roslaunch rosbridge_server rosbridge_websocket.launch</code></h2>
            </div>
        </div>
    )
};

export default RosError;