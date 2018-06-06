import React from 'react';
import './FormInput.css';
import {Input} from 'semantic-ui-react';

function FormInput({label, unit, onChange, placeholder}) {
    return (
        <div className="form-input">
            <div className="form-input-text">{label}</div>
            <Input
                className='form-input-input'
                label={{
                    basic: true,
                    content: unit,
                    className: 'form-input-label'
                }}
                labelPosition='right'
                placeholder={placeholder}
                onChange={onChange}
                size='massive'
            />
        </div>
    )
}

export default FormInput;