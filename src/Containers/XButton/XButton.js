import React from 'react';
import classes from './XButton.module.scss';

const XButton = (props) => {
    return (
        <button onClick={props.onClick} className={[classes.XButton, props.className].join(' ')}>

        </button>
    );
};

export default XButton;
