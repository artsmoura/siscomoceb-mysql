import React, { forwardRef } from 'react';
import ProfileModalHeader from './contentModalHeader/profileModalHeader';
import './modalHeader.css';

const ModalHeader = forwardRef((props, ref) => {

    const modalType = (e) => {
        switch (e) {
            case 'modalProfile':
                return <ProfileModalHeader user={props.user} />;
            default:
                return;
        }
    };

    return (
        <div className={`modalHeaderBox ${props.type}`} ref={ref}>
            {modalType(props.type)}
        </div>
    );
});

export default ModalHeader;