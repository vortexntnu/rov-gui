import React from 'react';
import {Grid} from 'semantic-ui-react';
import BubbleLevel from './BubbleLevel';

class General extends React.Component {
    render() {
        return (
            <Grid id="obs-tab" celled>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <h1>OBS-level</h1>
                        <BubbleLevel/>
                    </Grid.Column>
                    <Grid.Column>
                        <p>HALLA</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default General;