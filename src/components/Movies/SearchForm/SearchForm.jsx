/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './searchForm.css';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm({ onSearch, onSubmitCheckbox }) {
    const [inputValue, setInputValue] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [searchError, setSearchError] = useState({
        errorMessage: "",
        isValid: true
    });

    const location = useLocation();

    // Берем из хранилища название фильма и состояние чекбокса
    useEffect(() => {
        if (location.pathname === "/movies") {
            setInputValue(localStorage.getItem("searchWord"));
            setIsChecked(JSON.parse(localStorage.getItem("checkboxStatus")));
        } else if (location.pathname === "/saved-movies") {
            const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatusSavedMovies"));
            setIsChecked(checkboxStatus);
            onSubmitCheckbox(checkboxStatus);
        }
    }, [location]);

    useEffect(() => {
        searchError.isValid && setSearchError({ errorMessage: "", isValid: true });
    }, []);

    function handleInputChange(evt) {
        setInputValue(evt.target.value);

        if (evt.target.value.length === 0) {
            setSearchError({
                isValid: evt.target.validity.valid,
                errorMessage: "Нужно ввести ключевое слово"
            });
        } else {
            setSearchError({
                isValid: evt.target.validity.valid,
                errorMessage: ""
            });
        }
    }

    function handleSubmitSearch(evt) {
        evt.preventDefault();

        if (!inputValue) {
            return setSearchError({
                isValid: false,
                errorMessage: "Нужно ввести ключевое слово"
            });
        }

        onSearch(inputValue, isChecked);
    }

    function handleChangeCheckbox() {
        setIsChecked(!isChecked);
        onSubmitCheckbox(!isChecked);
    }

    return (
        <section className="search-form">
            <form
                className="search-form__container"
                onSubmit={handleSubmitSearch}
                noValidate
            >
                <input
                    className="search-form__input"
                    placeholder="Фильм"
                    type="text"
                    required
                    name="movie"
                    value={inputValue || ""}
                    onChange={handleInputChange}
                ></input>
                <button
                    className="search-form__button"
                    type="submit"
                >Поиск</button>
            </form>
            <span className="search-form__error">{searchError.errorMessage}</span>
            <Checkbox
                isChecked={isChecked}
                onSubmitCheckbox={handleChangeCheckbox}
            />
            <div className="search-form__line"></div>
        </section>
    );
};

export default SearchForm;