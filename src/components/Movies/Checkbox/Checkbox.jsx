import React from "react";
import './checkbox.css';

function Checkbox({ isChecked, onSubmitCheckbox }) {

    return (
        <div className='checkbox checkbox__container'>
            <input
                type='checkbox'
                className='checkbox__input'
                id="input-checkbox"
                checked={isChecked}
                onChange={onSubmitCheckbox}>
            </input>
            <label htmlFor='checkbox__input'></label>
            <p className='checkbox__title'>Короткометражки</p>
        </div>
    );
};

export default Checkbox;