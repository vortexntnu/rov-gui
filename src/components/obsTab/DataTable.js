import React from 'react';
import './DataTable.css'

const DataTable = (props) => (
    <table className="data-table">
        <tbody>
        {props.data.map(data => (
            <tr key={data.x}>
                <td>{data.x}</td>
                <td>{data.y.toFixed(1)}</td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default DataTable;