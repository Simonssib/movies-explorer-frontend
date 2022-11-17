import React from "react";
import './savedMovieCardList.css';
import MoviesCard from '../../Movies/MoviesCard/MoviesCard';

function SavedMoviesCardList() {
    return (
        <section className='saved-movies-card-list'>
            <MoviesCard
                name="delete-cross"
                title=""
            />
            <MoviesCard
                name="delete-cross"
                title=""
            />
            <MoviesCard
                name="delete-cross"
                title=""
            />
            <MoviesCard
                name="delete-cross"
                title=""
            />
            <MoviesCard
                name="delete-cross"
                title=""
            />
            <MoviesCard
                name="delete-cross"
                title=""
            />
        </section>
    );
};

export default SavedMoviesCardList;