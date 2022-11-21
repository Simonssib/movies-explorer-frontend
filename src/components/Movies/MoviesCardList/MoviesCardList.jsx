/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
    DEVICE_WIDTH_1280,
    MAX_CARDS,
    DEVICE_WIDTH_320,
    DEVICE_WIDTH_625,
    DEVICE_WIDTH_1101,
    ADD_CARDS_1280,
    ADD_CARDS_768,
    ADD_CARDS_320,
    ADD_CARDS_DEFAULT,
    SEARCH_CARDS_DEFAULT,
    SEARCH_CARDS_1101,
    SEARCH_CARDS_625, SEARCH_CARDS_320
} from "../../../utils/constants";

const MoviesCardList = ({ foundMovies, onSaveMovie, onDeleteMovie, savedMovies }) => {

    const location = useLocation();
    const [maxCards, setMaxCards] = useState(SEARCH_CARDS_DEFAULT);
    const [renderedMovies, setRenderedMovies] = useState([]);
    const [deviceWidth, setDeviceWidth] = useState(DEVICE_WIDTH_1280);

    useEffect(() => {
        setMovies();
    }, [maxCards]);

    useEffect(() => {
        checkDeviceWidth();
    }, [deviceWidth, foundMovies, location]);

    useEffect(() => {
        onSubscribeResize();
        return () => offSubscribeResize();
    }, [deviceWidth]);

    function setFoundMovies(count) {
        setMaxCards(count);
        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < count) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    // Количество карточек, которые отображаются на странице, зависит от ширины экрана устройства
    function checkDeviceWidth() {
        if (deviceWidth >= DEVICE_WIDTH_1101) {
            setFoundMovies(SEARCH_CARDS_1101);

        } else if (deviceWidth >= DEVICE_WIDTH_625) {
            setFoundMovies(SEARCH_CARDS_625);

        } else if (deviceWidth >= DEVICE_WIDTH_320) {
            setFoundMovies(SEARCH_CARDS_320);
        }

        if (location.pathname === "/saved") {
            setMaxCards(MAX_CARDS);
        }
    }

    function handleSubscribeResize() {
        setDeviceWidth(window.innerWidth);
    }

    function onSubscribeResize() {
        window.addEventListener("resize", handleSubscribeResize);
    }

    function offSubscribeResize() {
        window.removeEventListener("resize", handleSubscribeResize);
    }

    function setMovies() {
        let movies = [];
        foundMovies.forEach((item, i) => {
            if (i < maxCards) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    function handleAddButtonClick() {
        if (deviceWidth >= DEVICE_WIDTH_1101) {
            setMaxCards(maxCards + ADD_CARDS_1280);

        } else if (deviceWidth >= DEVICE_WIDTH_625) {
            setMaxCards(maxCards + ADD_CARDS_768);

        } else if (deviceWidth >= DEVICE_WIDTH_320) {
            setMaxCards(maxCards + ADD_CARDS_320);

        } else {
            setMaxCards(maxCards + ADD_CARDS_DEFAULT);
        }
    }

    return (
        <section className='movies-card-list'>
            <ul className="movies-card-list__container">
                {renderedMovies.map((item) => (
                    <MoviesCard
                        movie={item}
                        key={item.id || item._id}
                        onSaveMovie={onSaveMovie}
                        onDeleteMovie={onDeleteMovie}
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
        </section>
    );
};

export default MoviesCardList;