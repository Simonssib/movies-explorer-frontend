import React from "react";
import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <section className='movies-card-list'>
            <MoviesCard
                name="save_active"
                title=""
            />
            <MoviesCard
                name="save"
                title="Сохранить"
            />
            <MoviesCard
                name="save"
                title="Сохранить"
            />
            <MoviesCard
                name="save"
                title="Сохранить"
            />
            <MoviesCard
                name="save"
                title="Сохранить"
            />
            <MoviesCard
                name="save_active"
                title=""
            />
            <MoviesCard
                name="save"
                title="Сохранить"
            />
            <MoviesCard
                name="save"
                title="Сохранить"
            />
            <MoviesCard
                name="save"
                title="Сохранить"
            />
        </section>
    );
};

export default MoviesCardList;