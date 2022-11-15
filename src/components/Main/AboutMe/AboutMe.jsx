import React from 'react';
import './aboutMe.css';
import avatar from '../../../images/avatar.jpg';

function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <address className="about-me__block">
                    <h3 className="about-me__author-name">Симон</h3>
                    <p className="about-me__author-about">
                        Начинающий фронтенд-разработчик, 38 лет
                    </p>
                    <p className="about-me__author-description">
                        В конце 2021 года я узнал, что такое разработка веб-сайта и начал интересоваться фронтенд-разработкой. Сейчас я заканчиваю 
                        курсы веб-разработчика на платформе ЯндексПрактикум. Надеюсь, что весь пройденный материал будет толчком в попытке войти в IT.
                    </p>
                    <a
                        className="about-me__author-link"
                        href="https://github.com/cactys"
                        target="blanck"
                    >
                        Github
                    </a>
                </address>
                <img
                    className="about-me__author-avatar"
                    src={avatar}
                    alt="Аватар"
                />
            </div>
        </section>
    )
}

export default AboutMe;
