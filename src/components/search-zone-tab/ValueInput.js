import React from 'react';
import './ValueInput.css';
import {Input} from 'semantic-ui-react';

function ValueInput({label, unit, onChange, placeholder}) {
    return (
        <div className="value-input">
            <div className="value-input-text">{label}</div>
            <Input
                className='value-input-input'
                label={{
                    basic: true,
                    content: unit,
                    className: 'value-input-label'
                }}
                labelPosition='right'
                placeholder={placeholder}
                onChange={onChange}
                size='big'
            />
        </div>
    )
}

export default ValueInput;