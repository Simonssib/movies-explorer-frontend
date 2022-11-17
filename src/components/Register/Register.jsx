import React from "react";
import { Link } from 'react-router-dom';
import "./register.css";
import logo from '../../images/logo.png';

function Register() {
    return (
        <section className='register'>
            <img src={logo} alt="логотип" className="register__logo"/>
            <form className="register__form">
                <h1 className="register__title">Добро пожаловать!</h1>
                <p className="register__field">Имя</p>
                <input
                    id="имя"
                    name="имя"
                    type="text"
                    className="register__input"
                />
                <p className="register__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    type="text"
                    className="register__input"
                />
                <p className="register__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="register__input"
                />
                <button className="register__btn" type="submit">
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