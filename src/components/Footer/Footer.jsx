import React from "react";
import './footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <p className="footer__about">
                Учебный проект Яндекс.Практикум х BeatFilm.
            </p>
            <div className="footer__line" />
            <div className="footer__copyright">
                <p className="footer__year">&copy; 2022</p>
                <ul className="footer__nav">
                    <li className="footer__nav-item">
                        <a
                            className="footer__nav-link"
                            href="https://practicum.yandex.ru/"
                            rel='noreferrer'
                            target='_blank'
                        >
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__nav-item">
                        <a
                            className="footer__nav-link"
                            href="https://github.com/simonssib"
                            rel='noreferrer'
                            target='_blank'
                        >
                            Github
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;