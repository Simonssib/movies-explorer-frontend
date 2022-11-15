import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import "./savedMovies.css";

function SavedMovies() {
    return (
        <main className='saved-movies'>
            <SearchForm />
            <MoviesCardList />
        </main>
    );
};

export default SavedMovies;