import React from 'react';
import './BigRedButton.css'

function BigRedButton({text, onClick}) {
    return (
        <div onClick={onClick} className="big-red-button">
            <div>{text}</div>
        </div>
    )
}

export default BigRedButton;
