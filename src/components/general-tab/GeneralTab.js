import React from 'react';
import {Grid} from 'semantic-ui-react';
import './GeneralTab.css';
import {Tab} from 'semantic-ui-react';
import ArmToggler from './arm-toggler/ArmToggler';
import CameraTilt from './camera-tilt/CameraTilt';
import ControlMode from './control-mode/ControlMode';
import ThrusterScaling from './thruster-scaling/ThrusterScaling';
import Measurements from './measurements/Measurements';

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
                            <ControlMode/>
                            <Measurements/>
                        </Grid.Column>
                        <Grid.Column>
                            <ThrusterScaling/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Tab.Pane>
        )
    }
}

export default General;