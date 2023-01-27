//import { Link } from 'react-router-dom';
import React from 'react';
import { useHistory } from 'react-router-dom';
//import './pageNotFound.css';

function PageNotFound() {
    const history = useHistory();
    return (
        <main>
            <header className='page-not-found'>
                <h1 className="page-not-found__title">404</h1>
                <h2 className="page-not-found__subtitle">Страница не найдена</h2>
                <button onClick={() => history.goBack()} className="page-not-found__back">Назад</button>
            </header>
        </main>
    );
};

export default PageNotFound;
//<Link to="/" className="page-not-found__back">Назад</Link>
