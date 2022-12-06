import React from "react";
//import "./savedMovies.css";

import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies({
    onHandleSearch,
    onSave,
    onDelete,
    onSubmitCheckbox,
    savedMovies,
    preloader
}) {
    return (
        <main className='saved-movies'>
            <SearchForm
                onHandleSearch={onHandleSearch}
                onSubmitCheckbox={onSubmitCheckbox}
            />
            {preloader ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    foundMovies={savedMovies}
                    onSave={onSave}
                    onDelete={onDelete}
                    savedMovies={savedMovies}
                />
            )}
        </main>
    );
};

export default SavedMovies;