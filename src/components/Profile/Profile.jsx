import React from "react";
import './profile.css';
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <section className='profile'>
            <h2 className="profile__title">Привет, Симон!</h2>
            <fieldset className="profile__input-container">
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
                    />
                </label>
            </fieldset>
            <nav className="profile__navigation">
                <button className='profile__edit'>
                    Редактировать
                </button>
                <Link className="profile__logout" to="/">
                    Выйти из аккаунта
                </Link>
            </nav>
        </section>
    );
};

export default Profile;