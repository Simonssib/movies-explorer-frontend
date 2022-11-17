import React from "react";
import './pageNotFound.css';

function PageNotFound() {
    return (
        <header className='page-not-found'>
            <h1 className="page-not-found__title">404</h1>
            <h2 className="page-not-found__subtitle">Страница не найдена</h2>
            <nav className="page-not-found__back">Назад</nav>
        </header>
    );
};

export default PageNotFound;