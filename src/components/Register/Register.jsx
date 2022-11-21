import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./register.css";
import logo from '../../images/logo.png';

function Register({ onRegister, isLoading }) {
    const [userData, setUserData] = useState({
        name: {
            value: "",
            isValid: false,
            errorMessage: ""
        },
        email: {
            value: "",
            isValid: false,
            errorMessage: ""
        },
        password: {
            value: "",
            isValid: false,
            errorMessage: ""
        }
    });

    const isValid =
        userData.name.isValid &&
        userData.email.isValid &&
        userData.password.isValid;

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);

    useEffect(() => {
        isValid ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    const handleChange = (evt) => {
        const { name, value, validity, validationMessage } = evt.target;

        setUserData((prevState) => ({
            ...prevState,
            [name]: {
                ...userData[name],
                value,
                isValid: validity.valid,
                errorMessage: validationMessage
            }
        }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onRegister({
            name: userData.name.value,
            email: userData.email.value,
            password: userData.password.value
        });
    }

    return (
        <section className='register'>
            <img src={logo} alt="логотип" className="register__logo" />
            <form className="register__form" onSubmit={handleSubmit}>
                <h1 className="register__title">Добро пожаловать!</h1>
                <p className="register__field">Имя</p>
                <input
                    id="имя"
                    name="name"
                    type="text"
                    required
                    minLength="2"
                    maxLength="20"
                    className={`register__input ${userData.name.errorMessage && "register__input_error"
                        }`}
                    value={userData.name.value || ""}
                    onChange={handleChange}
                />
                <span className="register__form-error">
                    {userData.name.errorMessage}
                </span>

                <p className="register__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={userData.email.value || ""}
                    onChange={handleChange}
                    className={`register__input ${userData.email.errorMessage && "register__input_error"
                        }`}
                />
                <span className="register__form-error">
                    {userData.email.errorMessage}
                </span>


                <p className="register__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={userData.password.value || ""}
                    onChange={handleChange}
                    className={`register__input ${userData.password.errorMessage && "register__input_error"
                        }`}

                />
                <span className="register__form-error">
                    {userData.password.errorMessage}
                </span>

                <button
                    className={`register__btn ${isValid && !isLoading ? "" : "register__btn_disabled"
                        }`}
                    type="submit"
                    disabled={disabled}
                >
                    Зарегистрироваться
                </button>

                <div className="register__login">
                    <p className="register__article">Уже зарегистрированы?</p>
                    <Link to='/signin' className="register__link">Войти</Link>
                </div>
            </form>
        </section>
    );
};

export default Register;