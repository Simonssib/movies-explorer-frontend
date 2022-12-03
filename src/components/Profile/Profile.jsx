import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './profile.css';

function Profile({ onUpdateUser, onLogOut, loggedIn }) {
    const currentUser = useContext(CurrentUserContext);

    const [userInfo, setUserInfo] = useState({
        name: {
            value: "",
            errorMessage: "",
            isValid: true,
        },
        email: {
            value: "",
            errorMessage: "",
            isValid: true,
        }
    });

    const handleChangeInput = (e) => {
        const { name, value, validity, validationMessage } = e.target;

        setUserInfo((prevState) => ({
            ...prevState,
            [name]: {
                ...userInfo[name],
                value,
                errorMessage: validationMessage,
                isValid: validity.valid,
            }
        }));
    }

    const isValid = userInfo.name.isValid && userInfo.email.isValid;

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: userInfo.name.value,
            email: userInfo.email.value
        });
    }

    useEffect(() => {
        setUserInfo({
            name: {
                value: currentUser.name,
                errorMessage: "",
                isValid: true,
            },
            email: {
                value: currentUser.email,
                errorMessage: "",
                isValid: true,
            }
        });
    }, [currentUser, loggedIn]);


    return (
        <section className='profile'>
            <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
            <form className="profile__input-container" onSubmit={handleSubmit}>
                <label className="profile__field">
                    <p className="profile__input-name">Имя</p>
                    <input
                        type="text"
                        placeholder="Имя"
                        className="profile__input"
                        id="edit-name"
                        name="name"
                        required
                        minLength="2"
                        maxLength="30"
                        value={userInfo.name.value || ""}
                        onChange={handleChangeInput}
                    />
                </label>
                <span className="profile__span-error">
                    {userInfo.name.errorMessage}
                </span>
                <label className="profile__field">
                    <p className="profile__input-name">E-mail</p>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="profile__input"
                        id="edit-email"
                        name="email"
                        required
                        value={userInfo.email.value || ""}
                        onChange={handleChangeInput}
                    />
                </label>
                <span className="profile__span-error">
                    {userInfo.email.errorMessage}
                </span>
                <nav className="profile__navigation">
                    <button className='profile__edit' type="submit" disabled={!isValid}>
                        Редактировать
                    </button>
                    <Link className="profile__logout" to="/" onClick={onLogOut}>
                        Выйти из аккаунта
                    </Link>
                </nav>
            </form>
        </section>
    );
};

export default Profile;