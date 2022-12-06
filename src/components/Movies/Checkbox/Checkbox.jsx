import React from "react";
//import './checkbox.css';

function Checkbox({ onChangeCheckbox, checked }) {
    return (
        <div className='checkbox checkbox__container'>
            <input
                type='checkbox'
                className='checkbox-custom'
                id="checkbox-custom"
                name="checkbox-custom"
                defaultValue="yes"
                onChange={onChangeCheckbox}
                checked={checked}
            />
            <label htmlFor='checkbox-custom'></label>
            <p className='checkbox__title'>Короткометражки</p>
        </div>
    );
};

export default Checkbox;
