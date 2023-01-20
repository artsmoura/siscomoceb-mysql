import React, { useEffect, useRef, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useOutsideClick } from '../../utils';
import './selectbox.css';


const Selectbox = (props) => {

    const dispatch = useDispatch();
    const listSelect = props.options.option;
    const ref = useRef();
    const [isActive, setIsActive] = useState(false);
    const [optionsFilter, setOptionsFilter] = useState([]);

    useEffect(() => {
        setOptionsFilter(listSelect);
    }, [listSelect]);

    const changeOption = option => {
        const InfoDefault = {
            target: {
                type: 'select',
                name: props.name,
                value: {}
            }
        };

        InfoDefault.target.value = option.value ? option.value : option.name;
        props.action(InfoDefault);
        setIsActive(false);
    };

    const handleActive = () => {
        console.log('clicou??');
        setIsActive(!isActive);
        props.actionList && dispatch(props.actionList);
    };


    useOutsideClick(ref, () => setIsActive(false));

    return (
        <>
            <div className="selectBox" ref={ref}>
                <div className={`selectBtn ${isActive}`} onClick={() => /* setIsActive(!isActive) */ handleActive()}>
                    <span className={`labelFloating${props.disabled ? "-disabled" : ""}`}>{props.label}</span>
                    <span>{props.selected}</span>
                    <BiChevronDown />
                </div>
                {isActive && (
                    <div className="selectConteudo">
                        {optionsFilter.map((option) => (
                            <div key={option.value ? option.value : option.name} className="selectItem" onClick={(e) => {
                                changeOption(option);
                            }}>
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Selectbox;