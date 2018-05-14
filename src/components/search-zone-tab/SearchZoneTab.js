import React, {Component} from 'react';
import './SearchZoneTab.css';
import {Grid} from 'semantic-ui-react';
import FormInput from './FormInput';

class SearchZoneTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            takeoffHeading: null,
            speedOnAscent: null,
            ascentRate: null,
            engineFailureTime: null,
            speedOnDescent: null,
            descentRate: null,
            windDirection: null,
            windEquation: null,
        }
    }

    onTakeoffHeadingChange = (event) => {
        this.setState({takeoffHeading: event.target.value});
    };

    onSpeedOnAscentChange = (event) => {
        this.setState({speedOnAscent: event.target.value});
    };

    onAscentRateChange = (event) => {
        this.setState({ascentRate: event.target.value});
    };

    onEngineFailureTimeChange = (event) => {
        this.setState({engineFailureTime: event.target.value});
    };

    onSpeedOnDescentChange = (event) => {
        this.setState({speedOnDescent: event.target.value});
    };

    onDescentRateChange = (event) => {
        this.setState({descentRate: event.target.value});
    };

    onWindDirectionChange = (event) => {
        this.setState({windDirection: event.target.value});
    };

    onWindEquationChange = (event) => {
        this.setState({windEquation: event.target.value});
    };

    render() {
        const {takeoffHeading} = this.state;
        return (
            <div id="search-zone">
                <Grid stackable columns={2}>
                    <Grid.Column>
                        <h2>Input</h2>
                        <FormInput
                            label='Takeoff heading:'
                            unit='&#176;'
                            placeholder='e.g. 45, 254, 340, ...'
                            onChange={this.onTakeoffHeadingChange}
                        />
                        <FormInput
                            label='Airspeed on ascent:'
                            unit='ms⁻¹'
                            placeholder='e.g. 60, 76, 101, ...'
                            onChange={this.onSpeedOnAscentChange}
                        />
                        <FormInput
                            label='Ascent rate:'
                            unit='ms⁻¹'
                            placeholder='e.g. 3, 6, 10, ...'
                            onChange={this.onAscentRateChange}
                        />
                        <FormInput
                            label='Time before engine failure:'
                            unit='s'
                            placeholder='e.g. 31, 45, 68, ...'
                            onChange={this.onEngineFailureTimeChange}
                        />
                        <FormInput
                            label='Airspeed on descent:'
                            unit='ms⁻¹'
                            placeholder='e.g. 45, 67, 78, ...'
                            onChange={this.onSpeedOnDescentChange}
                        />
                        <FormInput
                            label='Descent rate:'
                            unit='ms⁻¹'
                            placeholder='e.g. 3, 6, 11, ...'
                            onChange={this.onDescentRateChange}
                        />
                        <FormInput
                            label='Wind direction:'
                            unit='&#176;'
                            placeholder='e.g. 45, 254, 340, ...'
                            onChange={this.onWindDirectionChange}
                        />
                        <FormInput
                            label='Wind equation:'
                            unit='???'
                            placeholder='Yeah I dunno...'
                            onChange={this.onWindEquationChange}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <h2>Output</h2>
                        <div>{takeoffHeading}</div>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default SearchZoneTab;