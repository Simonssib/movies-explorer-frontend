import React from "react";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './profile.css';
import { Link } from 'react-router-dom';

function Profile({ onUpdateUser, isLoading, onSignout }) {

    const currentUser = useContext(CurrentUserContext);

    const [userData, setUserData] = useState({
        name: {
            value: "",
            isValid: true,
            errorMessage: ""
        },
        email: {
            value: "",
            isValid: true,
            errorMessage: ""
        }
    });

    const isValid = userData.name.isValid && userData.email.isValid;

    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        isLoading ? setDisabled(true) : setDisabled(false);
    }, [isLoading]);

    useEffect(() => {
        isValid === true ? setDisabled(false) : setDisabled(true);
    }, [isValid]);

    useEffect(() => {
        if (
            currentUser.name === userData.name.value &&
            currentUser.email === userData.email.value
        ) {
            setDisabled(true);
        } else if (isValid) {
            setDisabled(false);
        } else if (!isValid) {
            setDisabled(true);
        }
    }, [currentUser, userData, isValid]);

    useEffect(() => {
        setUserData({
            name: {
                value: currentUser.name,
                isValid: true,
                errorMessage: ""
            },
            email: {
                value: currentUser.email,
                isValid: true,
                errorMessage: ""
            }
        });
    }, [currentUser]);

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
        onUpdateUser({
            name: userData.name.value,
            email: userData.email.value
        });
    }


    return (
        <section className='profile'>
            <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
            <form
                className="profile__input-container"
                noValidate
                onSubmit={handleSubmit}
            >
                <label className="profile__field">
                    <span className="profile__input-name">Имя</span>
                    <input
                        type="text"
                        placeholder="Имя"
                        className="profile__input"
                        id="edit-name"
                        name="name"
                        required
                        minLength="2"
                        maxLength="30"
                        value={userData.name.value || ""}
                        onChange={handleChange}
                    />
                </label>
                <span className="profile__span-error">
                    {userData.name.errorMessage}
                </span>
                <label className="profile__field">
                    <span className="profile__input-name">E-mail</span>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="profile__input"
                        id="edit-email"
                        name="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        value={userData.email.value || ""}
                        onChange={handleChange}
                    />
                </label>
                <span className="profile__span-error">
                    {userData.email.errorMessage}
                </span>
                <nav className="profile__navigation">
                    <button
                        className={`profile__edit ${isValid && !isLoading ? "" : "profile__edit_disabled"
                            }`}
                        type="submit"
                        disabled={disabled}
                    >
                        Редактировать
                    </button>
                    <Link className="profile__logout" to="/" onClick={onSignout}>
                        Выйти из аккаунта
                    </Link>
                </nav>
            </form>
        </section>
    );
};

export default Profile;