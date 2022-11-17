import React from "react";
import SearchForm from "../Movies/SearchForm/SearchForm";
import SavedMoviesCardList from "./SavedMovieCardList/SavedMovieCardList";
import "./savedMovies.css";

function SavedMovies() {
    return (
        <main className='saved-movies'>
            <SearchForm />
            <SavedMoviesCardList />
        </main>
    );
};

export default SavedMovies;