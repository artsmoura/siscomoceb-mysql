import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../reduxLayout/layoutAction';
import Button from '../Button/button';
import './modal.css';

const Modal = (props) => {

    const dispatch = useDispatch();

    return (
        <>
            <div className={"darkBG"} />
            <div className={"centered"}>
                <div className={"modal"}>
                    <div className={"modalHeader"}>
                        <h5 className={"heading"}></h5>
                    </div>
                    <Button
                        className={"closeBtn"}
                        onClick={() => dispatch(closeModal())}
                        icon={<RiCloseLine />}
                    />
                    <div className={"modalContent"}>
                        {props.content}
                    </div>
                    <div className={"modalActions"}>
                        <div className={"actionsContainer"}>
                            <button className={"cancelBtn"} >
                                {props.btnSecond}
                            </button>
                            <button className={props.btnPrimary === "delete" ? "deleteBtn" : ''} >
                                {props.btnPrimary}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;