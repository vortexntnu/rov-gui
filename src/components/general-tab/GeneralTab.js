import React from 'react';
import {Grid} from 'semantic-ui-react';
import HealthCheck from './healthcheck/HealthCheck';
import './GeneralTab.css'

class General extends React.Component {
    render() {
        return (
            <Grid id="general-tab" celled>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <p>HALLA</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>HALLA</p>
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
        )
    }
}

export default General;