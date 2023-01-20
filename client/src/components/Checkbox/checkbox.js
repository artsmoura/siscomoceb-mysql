import React from 'react';
import './checkbox.css';

export default ({ name, text, onChange, id, checked, disabled, keyIndex }) => {
    return (
        <div className='custom-control-checkbox' key={keyIndex}>
            <input
                type='checkbox'
                className='custom-input'
                name={name}
                id={id ? id : name}
                onChange={onChange}
                checked={checked}
                value={checked}
                disabled={disabled}
            />
            <label className='custom-label' htmlFor={id ? id : name}>
                {text}
            </label>
        </div>
    );
};