import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./login.css";
import logo from '../../images/logo.png';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value)
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password })
            .catch(err => console.log(err));
    };

    return (
        <section className='login'>
            <img src={logo} alt="логотип" className="login__logo" />
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Рады видеть!</h1>
                <p className="login__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    className="login__input"
                    placeholder="Email"
                    value={email}
                    type="email"
                    onChange={handleChangeEmail}
                    required
                />
                <p className="login__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    className="login__input"
                    type="password"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={handleChangePassword}
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