import React from "react";
//import './Movies.css';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Preloader from "./Preloader/Preloader";

function Movies({
    onHandleSearch,
    foundMovies,
    savedMovies,
    onSave,
    onDelete,
    onSubmitCheckbox,
    preloader
}) {
    return (
        <main className="movies">
            <SearchForm
                onHandleSearch={onHandleSearch}
                onSubmitCheckbox={onSubmitCheckbox}
            />
            {preloader ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    foundMovies={foundMovies}
                    onSave={onSave}
                    onDelete={onDelete}
                    savedMovies={savedMovies}
                />
            )}
        </main>
    )
};

export default Movies;