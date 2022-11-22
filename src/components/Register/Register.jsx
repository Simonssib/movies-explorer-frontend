import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./register.css";
import logo from '../../images/logo.png';

function Register({ onRegister }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ name, email, password });
    };

    return (
        <section className='register'>
            <img src={logo} alt="логотип" className="register__logo" />
            <form className="register__form" onSubmit={handleSubmit}>
                <h1 className="register__title">Добро пожаловать!</h1>
                <p className="register__field">Имя</p>
                <input
                    id="имя"
                    name="имя"
                    type="text"
                    className="register__input"
                    placeholder="Имя"
                    value={name}
                    onChange={handleChangeName}
                />
                <p className="register__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="register__input"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}
                />
                <p className="register__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="register__input"
                    placeholder="Пароль"
                    value={password}
                    onChange={handleChangePassword}
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