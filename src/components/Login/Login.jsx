import React from "react";
import { Link } from 'react-router-dom';
import "./login.css";
import logo from '../../images/logo.png';

function Login() {
    return (
        <section className='login'>
            <img src={logo} alt="логотип" className="login__logo"/>
            <form className="login__form">
                <h1 className="login__title">Рады видеть!</h1>
                <p className="login__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    className="login__input"
                    type="text"
                    required
                />
                <p className="login__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    className="login__input"
                    type="password"
                    required
                />
                <button className="login__btn" type="submit">
                    Войти
                </button>
                <div className="login__register">
                    <p className="login__article">Ещё не зарегистрированы?</p>
                    <Link to='/signup' className="login__register-link">Регистрация</Link>
                </div>
            </form>
        </section>
    );
};

export default Login;