import React from "react";
import { Link } from 'react-router-dom';
import "./moviesHeader.css";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function MoviesHeader({ onOpen, isOpen, onClose }) {

    return (
        <header className='header'>
            <Link to='/' className="header__logo" />
            <nav className="header__nav">
                <Link to='/movies' className="header__link">Фильмы</Link>
                <Link to='/saved' className="header__link">Сохраненные фильмы</Link>
            </nav>
            <Link to='/me' className="header__account-container">
                <p className="header__account">Аккаунт</p>
                <div className="header__account-icon" />
            </Link>
            <button
                className='header__open-burger'
                type="button"
                onClick={onOpen}
            ></button>
            <BurgerMenu
                isOpen={isOpen}
                onClose={onClose}>
            </BurgerMenu>
        </header>
    );
};

export default MoviesHeader;
