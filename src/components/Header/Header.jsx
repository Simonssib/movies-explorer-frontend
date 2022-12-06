import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
//import "../Header/Header.css";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function MoviesHeader({ onOpen, isOpen, onClose, loggedIn }) {
    const loggedEndpoints = ["/movies", "/saved", "/me"];

    return (
        <Switch>
            <Route exact path="/">
                {(!loggedIn) ? (
                    <header className="header-promo">
                        <div className='header'>
                            <Link to='/' className="header__logo" />
                            <nav className="header__nav-promo">
                                <Link to="/signup" className="header__register">Регистрация</Link>
                                <Link to="/signin" className="header__login">Войти</Link>
                            </nav>
                        </div>
                    </header>
                ) : (
                    <header className="header-promo">
                        <div className='header'>
                            <Link to='/' className="header__logo" />
                            <nav className="header__nav">
                                <Link to='/movies' className="header__link">Фильмы</Link>
                                <Link to='/saved' className="header__link">Сохраненные фильмы</Link>
                            </nav>
                            <Link to='/me' className="header__account-container">
                                <p className="header__account">Аккаунт</p>
                                <div className="header__account-icon header__account-icon-promo" />
                            </Link>
                            <button
                                className='header__open-burger header__open-burger-promo'
                                type="button"
                                onClick={onOpen}
                            ></button>
                            <BurgerMenu
                                isOpen={isOpen}
                                onClose={onClose}>
                            </BurgerMenu>
                        </div>
                    </header>
                )}
            </Route>
            <Route exact path={loggedEndpoints}>
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
            </Route>
        </Switch>
    );
};

export default MoviesHeader;
