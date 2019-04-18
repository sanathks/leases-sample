import React from 'react';
import './back-button.css';

export const BackButton = (props) => {
    return (
        <a href={'/'} className="back-button" onClick={(e) => {
            e.preventDefault();
            props.history.goBack();
        }}>
            <span> Go Back List</span>
        </a>
    );
};
