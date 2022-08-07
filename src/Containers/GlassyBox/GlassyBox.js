import React from 'react';
import classes from './GlassyBox.module.css'
import PropTypes from "prop-types";

const GlassyBox = (props) => {
    return (
        <div style={props.style} className={[classes.GlassyBox, props.className].join(' ')}>
            {props.children}
        </div>
    );
};

GlassyBox.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
};

export default GlassyBox;
