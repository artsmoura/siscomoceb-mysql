import React from 'react';
import './button.css';

const Button = (props) => {
    return (
        <div key={props.myKey} className={props.className && props.className} onClick={props.onClick} text={props.text}>
            <button
                type={props.type && props.type}
                name={props.name && props.name}
                id={props.id && props.id}
                required={props.isRequired && props.isRequired}
                className="button"
            >
                {props.text &&
                    <span>
                        {props.text}
                    </span>
                }
                {props.icon && props.icon}
            </button>
        </div>
    );
};

export default Button;