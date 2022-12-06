import React from "react";
import { Link } from 'react-router-dom';
import FormValidator from "../../utils/FormValidator";

function Login({ onLogin }) {
    const checkInput = FormValidator();
    const { email, password } = checkInput.errors;

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = checkInput.values;
        onLogin({ email, password });
        checkInput.resetForm();
    };

    return (
        <section className='login'>
            <Link to='/' className="login__logo" />
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Рады видеть!</h1>
                <p className="login__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    className="login__input"
                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                    type="email"
                    minLength="2"
                    maxLength="30"
                    onChange={checkInput.handleChange}
                    value={checkInput?.values?.email || ""}
                    required
                />
                <span className={`login__form-error ${
                  !checkInput.isFormValid && "login__form-error_visible"
                }`}>
                    {email}
                </span>

                <p className="login__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    className="login__input"
                    type="password"
                    required
                    value={checkInput?.values?.password || ""}
                    onChange={checkInput.handleChange}
                />
                <span className={`login__form-error ${
                  !checkInput.isFormValid && "login__form-error_visible"
                }`}>
                    {password}
                </span>
                <button className="login__btn" type="submit" disabled={!checkInput.isFormValid}>
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