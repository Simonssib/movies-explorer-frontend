import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./login.css";
import logo from '../../images/logo.png';

function Login({ onLogin, isLoading }) {
    const [userData, setUserData] = useState({
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

    const isValid = userData.email.isValid && userData.password.isValid;

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
        onLogin({
            email: userData.email.value,
            password: userData.password.value
        });
        setUserData({ email: '', password: '' });
    }

    return (
        <section className='login'>
            <img src={logo} alt="логотип" className="login__logo" />
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__title">Рады видеть!</h1>
                <p className="login__field">E-mail</p>
                <input
                    id="email"
                    name="email"
                    className={`login__input ${userData.email.errorMessage && "login__input_error"
                        }`}
                    type="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={userData.email.value || ""}
                    onChange={handleChange}
                />
                <span className="login__form-error">
                    {userData.email.errorMessage}
                </span>

                <p className="login__field">Пароль</p>
                <input
                    id="password"
                    name="password"
                    className={`login__input ${userData.password.errorMessage && "login__input_error"
                        }`}
                    type="password"
                    value={userData.password.value || ""}
                    onChange={handleChange}
                    required
                />
                <span className="login__form-error">
                    {userData.password.errorMessage}
                </span>

                <button
                    className={`login__btn ${isValid && !isLoading ? "" : "login__btn_disabled"
                        }`}
                    type="submit"
                    disabled={disabled}
                >
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