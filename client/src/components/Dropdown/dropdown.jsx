import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button/button';
import './dropdown.css';

const Dropdown = forwardRef((props, ref) => {

    const dispatch = useDispatch();

    return (
        <div className={props.type} ref={ref}>
            {props.type === 'cardDropdown' ?
                props.action.map((action, index) => (
                    <Button
                        className={'dropdownBtn'}
                        key={index}
                        myKey={action.name}
                        text={action.name}
                        onClick={() => dispatch(action.action)}
                    />
                ))
                : null}
        </div>
    );
});

export default Dropdown;