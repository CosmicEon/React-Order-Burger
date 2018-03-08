import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const modal = (props) => {
    return (
        <Auxiliary>
            <Backdrop show={props.show} closeBackdrop={props.closeBackdrop} />
            <div className="Modal"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Auxiliary>
    );
};

export default modal;
