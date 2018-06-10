import React from 'react';
import {Grid} from 'semantic-ui-react';
import Seismograph from './Seismograph';
import DataTable from './DataTable';
import './DataGrid.css';

const DataGrid = ({width, data}) => {
    if (data.length === 0) {
        return (
            <Grid.Column width={width}>
                <div id="no-data">No data...</div>
            </Grid.Column>
        )
    } else {
        return (
            <Grid.Column width={width}>
                <Seismograph data={data}/>
                <DataTable data={data}/>
            </Grid.Column>
        )
    }
};

export default DataGrid;