import React from 'react';
import './moviesCard.css';
import benksi from '../../../images/benksi.jpg';

function MoviesCard({ name, title }) {

    return (
        <section className="movie-card">
            <header className='movie-card__header'>
                <div className='movie-card__title'>
                    В погоне за Бенкси
                </div>
                <div className="movie-card__duration">
                    27 минут
                </div>
            </header>
            <img className='movie-card__image' alt='постер фильма' src={benksi} />
            <footer className="movie-card__footer">
                <button className={`movie-card__${name}`} type='button'>
                    {title}
                </button>
            </footer>
        </section>
    )
}

export default MoviesCard;