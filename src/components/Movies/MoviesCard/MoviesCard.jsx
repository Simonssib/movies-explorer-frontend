import React from 'react';
import './moviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, savedMovies, onSave, onDelete, }) {
    const location = useLocation();
    let moviesPage = location.pathname === "/movies";

    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч. ' + minutes + 'м.';
    };

    const isSaved = savedMovies.find((item) => item.movieId === movie.id);

    const saveButtonClass = isSaved ? "movie-card__save_active" : "movie-card__save";

    const handleDeleteMovie = () => onDelete(movie);

    const handleSaveMovie = () => onSave(movie);

    return (
        <section className="movie-card">
            <header className='movie-card__header'>
                <div className='movie-card__title'>
                    {movie.nameRU}
                </div>
                <div className="movie-card__duration">
                    {getTimeFromMins(movie.duration)}
                </div>
            </header>
            <a href={movie.trailerLink} rel="noreferrer" target="_blank">
                <img
                    className='movie-card__image'
                    alt='Постер фильма'
                    src={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image} />
            </a>
            <footer className="movie-card__footer">
                {moviesPage ? (
                    <button
                        className={saveButtonClass}
                        type="button"
                        onClick={handleSaveMovie}
                    >
                        {!isSaved ? "Сохранить" : ""}
                    </button>
                ) : (
                    <button
                        className="movie-card__delete-cross"
                        type="button"
                        onClick={handleDeleteMovie}
                    ></button>
                )}
            </footer>
        </section>
    )
}

export default MoviesCard;
