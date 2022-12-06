import React from "react";
import { useEffect, useState } from 'react';
import { useLocation, Route } from "react-router-dom";
//import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ onSave, onDelete, foundMovies, savedMovies }) {
    const location = useLocation();
    const [renderedMovies, setRenderedMovies] = useState([]);
    const [windowWidth, setWindowWidth] = useState(1280);
    const [appearCards, setAppearCards] = useState(12);

    useEffect(() => {
        setMovies();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [appearCards]);

    useEffect(() => {
        checkDeviceWidth();

        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [windowWidth, foundMovies, location]);

    function checkDeviceWidth() {
        if (windowWidth >= 1280) {
            setFoundMovies(12);
        } else if (windowWidth >= 768) {
            setFoundMovies(8);
        } else if (windowWidth >= 480) {
            setFoundMovies(5);
        }
        if (location.pathname === "/saved") {
            setAppearCards(12);
        }
    }

    function handleAddButtonClick() {
        if (windowWidth >= 1280) {
            setAppearCards(appearCards + 3);
        } else if (windowWidth >= 768) {
            setAppearCards(appearCards + 2);
        } else if (windowWidth >= 480) {
            setAppearCards(appearCards + 2);
        } else {
            setAppearCards(appearCards + 2);
        }
    }

    function setFoundMovies(count) {
        setAppearCards(count);
        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < count) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    function setMovies() {
        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < appearCards) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    return (
        <section className='movies-card-list'>
            <ul className="movies-card-list__container">
                {renderedMovies.map((item) => (
                    <MoviesCard
                        movie={item}
                        key={item.id || item._id}
                        onSave={onSave}
                        onDelete={onDelete}
                        savedMovies={savedMovies}
                    />
                ))}
            </ul>
            {foundMovies.length !== renderedMovies.length ? (
                <>
                    <Route path="/movies">
                        <button
                            className="movies-card-list__button"
                            type="button"
                            onClick={handleAddButtonClick}
                        >
                            Ещё
                        </button>
                    </Route>
                    <Route path="/saved">
                        <button
                            className="movies-card-list__button"
                            type="button"
                            onClick={handleAddButtonClick}
                        >
                            Ещё
                        </button>
                    </Route>
                </>
            ) : (
                ""
            )}
        </section >
    );
};

export default MoviesCardList;
