import React from "react";
//import './portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__navigation">
                <li className="portfolio__navigation-item">
                    <a
                        className="portfolio__navigation-link"
                        href="https://github.com/simonssib/how-to-learn"
                        target="blanck"
                    >
                        Статичный сайт
                        <span className="portfolio__navigation-arrow">&#8599;</span>
                    </a>
                </li>
                <li className="portfolio__navigation-item">
                    <a
                        className="portfolio__navigation-link"
                        href="https://github.com/simonssib/russian-travel"
                        target="blanck"
                    >
                        Адаптивный сайт
                        <span className="portfolio__navigation-arrow">&#8599;</span>
                    </a>
                </li>
                <li className="portfolio__navigation-item">
                    <a
                        className="portfolio__navigation-link"
                        href="https://github.com/simonssib/react-mesto-api-full"
                        target="blanck"
                    >
                        Одностраничное приложение
                        <span className="portfolio__navigation-arrow">&#8599;</span>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;