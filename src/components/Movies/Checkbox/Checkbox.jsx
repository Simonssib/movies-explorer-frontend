import React from "react";
import './Checkbox.css';

function Checkbox({ onChangeCheckbox, checked }) {
    return (
        <label className="checkbox">
            <div className="checkbox__container">
                <input
                    type='checkbox'
                    className='checkbox__input'
                    id="simon"
                    name="checkbox-custom"
                    defaultValue="yes"
                    onChange={onChangeCheckbox}
                    checked={checked}
                />
                <span className="checkbox__tumbler" />
            </div>
            <p className="checkbox__title">Короткометражки</p>
        </label>

    );
};

export default Checkbox;
