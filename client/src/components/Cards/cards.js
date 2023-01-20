import React, { useRef, useState } from "react";
import Button from "../Button/button";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import './cards.css';
import Dropdown from "../Dropdown/dropdown";
import { useOutsideClick } from "../../utils";

const Card = (props) => {

    const [isActive, setIsActive] = useState(false);
    const ref = useRef();

    useOutsideClick(ref, () => setIsActive(false));

    return (
        <div className="cardBox" key={props.key && props.key} onClick={props.clickCard}>
            {props.image ?
                <div className="cardImg" style={{
                    backgroundImage: `url(${props.image})`,
                }}></div>
                : null}
            <div className="cardInfo">
                <h2>{props.title}</h2>
                <p>Data: {props.data}</p>
                <p>Inscrição: {props.inscricaoDate}</p>
                <p>Local: {props.location}</p>
            </div>
            {
                props.cardOption === true ?
                    <div className="cardOption">
                        <Button
                            name="option"
                            className='optionBtn'
                            icon={<BiDotsVerticalRounded size={"2em"} />}
                            onClick={() => setIsActive(!isActive)}
                        />
                    </div>
                    : null
            }
            {
                isActive &&
                <Dropdown
                    ref={ref}
                    type={'cardDropdown'}
                    action={props.actions}
                />
            }
        </div>
    );
};

export default Card;