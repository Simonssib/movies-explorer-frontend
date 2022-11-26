import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import './profile.css';

function Profile({ onUpdateUser, onLogOut, loggedIn }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ name, email });
    }

    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser, loggedIn]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

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
                        value={name || ""}
                        onChange={handleNameChange}
                    />
                </label>
                <label className="profile__field">
                    <p className="profile__input-name">E-mail</p>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="profile__input"
                        id="edit-email"
                        name="email"
                        required
                        value={email || ""}
                        onChange={handleEmailChange}
                    />
                </label>
                <nav className="profile__navigation">
                    <button className='profile__edit' type="submit">
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