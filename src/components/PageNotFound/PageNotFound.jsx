import React from "react";
import { Link } from 'react-router-dom';
import './pageNotFound.css';

function PageNotFound() {
    return (
        <header className='page-not-found'>
            <h1 className="page-not-found__title">404</h1>
            <h2 className="page-not-found__subtitle">Страница не найдена</h2>
            <Link to='/' className="page-not-found__back">Назад</Link>
        </header>
    );
};

export default PageNotFound;