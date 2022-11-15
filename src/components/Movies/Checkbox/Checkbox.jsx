import React from "react";
import './checkbox.css';

function Checkbox() {

    return (
        <div className='checkbox checkbox__container'>
            <input
                type='checkbox'
                className='checkbox__input'
                id='custom-checkbox'
                name='custom-checkbox'
                defaultValue='yes'>
            </input>
            <label htmlFor='checkbox__input'></label>
            <p className='checkbox__title'>Короткометражки</p>
        </div>
    );
};

export default Checkbox;