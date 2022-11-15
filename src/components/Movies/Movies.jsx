import React from "react";
import './Movies.css';
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import LoadMore from "./LoadMore/LoadMore";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {
    return (
        <section className="movies">
            <SearchForm/>
            <MoviesCardList/>
            <LoadMore/>
        </section>
    )
};

export default Movies;