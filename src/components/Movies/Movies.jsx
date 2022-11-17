import React from "react";
import './Movies.css';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import LoadMore from "./LoadMore/LoadMore";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {
    return (
        <main className="movies">
            <SearchForm/>
            <MoviesCardList/>
            <LoadMore/>
        </main>
    )
};

export default Movies;