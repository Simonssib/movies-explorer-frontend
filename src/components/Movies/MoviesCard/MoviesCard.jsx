import React from 'react';
import { Route } from 'react-router-dom';
import './moviesCard.css';
import { BASE_BEATFILMMOVIES_URL, handleMovieDuration } from "../../../utils/constants";

function MoviesCard({ movie, onSaveMovie, onDeleteMovie, savedMovies }) {

    const isSaved = savedMovies.find((item) => item.movieId === movie.id);

    function handleSaveMovie() {
        if (!isSaved) {
            onSaveMovie(movie);
        } else {
            onDeleteMovie(movie);
        }
    }

    const handleDeleteMovie = () => {
        onDeleteMovie(movie);
    }

    return (
        <section className="movie-card">
            <header className='movie-card__header'>
                <div className='movie-card__title'>
                    {movie.nameRU}
                </div>
                <div className="movie-card__duration">
                    {handleMovieDuration(movie.duration, movie)}
                </div>
            </header>
            <a href={movie.trailerLink} target="blank">
                <img
                    className='movie-card__image'
                    alt='постер фильма'
                    src={movie.image.url ? `${BASE_BEATFILMMOVIES_URL}/${movie.image.url}` : movie.image}
                />
            </a>
            <footer className="movie-card__footer">
                <Route path="/movies">
                    <button
                        className={isSaved ? "movie-card__save_active" : "movie-card__save"}
                        type="button"
                        onClick={handleSaveMovie}
                    >
                        {!isSaved ? "Сохранить" : ""}
                    </button>
                </Route>

                <Route path="/saved">
                    <button
                        className="movie-card__delete-cross"
                        type="button"
                        onClick={handleDeleteMovie}
                    />
                </Route>
            </footer>
        </section>
    )
}

export default MoviesCard;