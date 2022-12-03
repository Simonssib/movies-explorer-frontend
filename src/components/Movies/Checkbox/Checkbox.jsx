import React from "react";
import './checkbox.css';

function Checkbox({ onChangeCheckbox, checked }) {
    return (
        <div className='checkbox checkbox__container'>
            <input
                type='checkbox'
                className='checkbox__input'
                id="checkbox"
                name="checkbox"
                onChange={onChangeCheckbox}
                checked={checked}
            />
            <label htmlFor='checkbox__input'></label>
            <p className='checkbox__title'>Короткометражки</p>
        </div>
    );
};

export default Checkbox;
