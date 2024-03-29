import React from "react";
import { Link } from 'react-router-dom';
//import './promo.css';
import promoImage from '../../../images/promoImage.svg';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <Link className='promo__link' to="/movies">Узнать больше</Link>
                <img className='promo__image' src={promoImage} alt='Логотип'/>
            </div>
            
        </section>
    )
};

export default Promo;
