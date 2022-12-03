import React from "react";
import { Link } from 'react-router-dom';
import "./register.css";
import logo from '../../images/logo.png';
import FormValidator from "../../utils/FormValidator";

function Register({ onRegister }) {
    const validationInput = FormValidator();
    const { name, email, password } = validationInput.errors;

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = validationInput.values;
        onRegister({ name, email, password });
        validationInput.resetForm();
    };

    return (
        <section className='register'>
            <img src={logo} alt="логотип" className="register__logo" />
            <form className="register__form" onSubmit={handleSubmit} noValidate>
                <h1 className="register__title">Добро пожаловать!</h1>
                <p className="register__field">Имя</p>
                <input
                    id="имя"
                    name="name"
                    type="text"
                    minLength="2"
                    maxLength="30"
                    className="register__input"
                    onChange={validationInput.handleChange}
                    value={validationInput?.values?.name || ""}
                    required
                />
                <span className={`register__form-error ${!validationInput.isFormValid && "register__form-error_visible"
                    }`}>
                    {name}
                </span>

                <p className="register__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="register__input"
                    minLength="2"
                    maxLength="30"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    onChange={validationInput.handleChange}
                    value={validationInput?.values?.email || ""}
                    required
                />
                <span className={`register__form-error ${!validationInput.isFormValid && "register__form-error_visible"
                    }`}>
                    {email}
                </span>


                <p className="register__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="register__input"
                    onChange={validationInput.handleChange}
                    value={validationInput?.values?.password || ""}
                    required
                />
                <span className={`register__form-error ${!validationInput.isFormValid && "register__form-error_visible"
                    }`}>
                    {password}
                </span>

                <button className="register__btn" type="submit" disabled={!validationInput.isFormValid}>
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