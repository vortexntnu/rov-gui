import React from "react";
import HealthIndicator from "./HealthIndicator";

class HealthCheck extends React.Component {
    render() {
        return (
            <div id="healthCheck">
                <h3>Health check</h3>
                <HealthIndicator ros={this.props.ros} item="IMU" topicName="/heartbeat/imu"/>
                <HealthIndicator ros={this.props.ros} item="Manipulator" topicName="/heartbeat/manipulator"/>
            </div>
        )
    }
}

export default HealthCheck;