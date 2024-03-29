import React from 'react';
//import './aboutProject.css';

function AboutProject() {
    return (
        <section className='about-project__main'>
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__items">
                <div className="about-project__item">
                    <h3 className="about-project__subtitle">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__description">
                        Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__item">
                    <h3 className="about-project__subtitle">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__description">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                        соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__graphs">
                <div className='about-project__graph'>
                    <div className="about-project__backend_black">
                        1 неделя
                    </div>
                    <div className="about-project__backend">
                        Back-end
                    </div>
                </div>
                <div className='about-project__graph'>
                    <div className="about-project__frontend_grey">
                        4 неделя
                    </div>
                    <div className="about-project__frontend">
                        Front-end
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;