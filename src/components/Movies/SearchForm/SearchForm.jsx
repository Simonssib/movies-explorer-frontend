import React from "react";
import './searchForm.css';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm() {

    return (
        <section className="search-form">
            <form className="search-form__container">
                <input
                    className="search-form__input"
                    placeholder="Фильм"
                    type="text"
                ></input>
                <button
                    className="search-form__button"
                    type="submit"
                >Поиск</button>
            </form>
            <Checkbox></Checkbox>
            <div className="search-form__line"></div>
        </section>
    );
};

export default SearchForm;