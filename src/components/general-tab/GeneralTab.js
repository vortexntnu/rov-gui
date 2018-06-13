import React from 'react';
import {Grid} from 'semantic-ui-react';
import HealthCheck from './healthcheck/HealthCheck';
import './GeneralTab.css';
import {Tab} from 'semantic-ui-react';
import ArmToggler from './arm-toggler/ArmToggler';
import CameraTilt from './camera-tilt/CameraTilt';

class General extends React.Component {
    render() {
        return (
            <Tab.Pane id="general-tab">
                <Grid celled>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <ArmToggler/>
                        </Grid.Column>
                        <Grid.Column>
                            <CameraTilt/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            {/*<RosGraph topicName="/rosgraph"/>*/}
                        </Grid.Column>
                        <Grid.Column>
                            <HealthCheck/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane>
        )
    }
}

export default General;