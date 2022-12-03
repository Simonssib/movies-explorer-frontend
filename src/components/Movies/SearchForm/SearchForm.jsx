import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './searchForm.css';
import Checkbox from '../Checkbox/Checkbox';

function SearchForm({ onHandleSearch, onSubmitCheckbox }) {
    const location = useLocation();
    const movies = location.pathname === "/movies";
    const savedMovies = location.pathname === "/saved";
    const [isChecked, setIsChecked] = useState(false);
    const [value, setValue] = useState('');
    const [searchFormState, setSearchFormState] = useState({
        errorText: "",
        isFormValid: false,
    });

    useEffect(() => {
        if (movies) {
            setValue(localStorage.getItem("search-word"));
            setIsChecked(JSON.parse(localStorage.getItem("checkbox-status")));
        } else if (savedMovies) {
            const checkboxStatus = JSON.parse(localStorage.getItem("checkbox-status-saved-movies"));
            setIsChecked(checkboxStatus);
            onSubmitCheckbox(checkboxStatus);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [location]);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (value) {
            onHandleSearch(value, isChecked);
        }
    }

    function handleInputChange(e) {
        setValue(e.target.value);
        if (e.target.value.length === 0) {
            setSearchFormState({
                isFormValid: e.target.validity.valid,
                errorText: "Введите ключевое слово"
            })
        }
        else {
            setSearchFormState({
                isFormValid: e.target.validity.valid,
                errorText: ""
            });
        }
    }

    function handleChangeCheckboxStatus() {
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
                    value={value || ""}
                    onChange={handleInputChange}
                ></input>
                <button
                    className="search-form__button"
                    type="submit"
                >Поиск</button>
            </form>
            <span className="search-form__error">{searchFormState.errorText}</span>
            <Checkbox
                checked={isChecked}
                onChangeCheckbox={handleChangeCheckboxStatus}
            ></Checkbox>
            <div className="search-form__line"></div>
        </section>
    );
};

export default SearchForm;