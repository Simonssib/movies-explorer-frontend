import React from "react";
import { Link } from 'react-router-dom';
import './promo.css';
import promoImage from '../../../images/promoImage.svg';
import logo from '../../../images/logo.png'

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <header className="promo__header">
                    <img className="promo__logo" alt="иконка" src={logo}></img>
                    <nav className="promo__nav">
                        <Link to="/signup" className="promo__register">Регистрация</Link>
                        <Link to="/signin" className="promo__login">Войти</Link>
                    </nav>
                </header>
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <Link className='promo__link' to="/movies">Узнать больше</Link>
            </div>
            <img className='promo__image' src={promoImage} alt='Логотип'/>
        </section>
    )
};

export default Promo;