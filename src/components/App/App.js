/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from "react";
import {
  Switch, Route, useHistory, Redirect
} from "react-router-dom";
import "../../vendor/normalize.css";
import './app.css';
import * as auth from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from '../SavedMovies/SavedMovies';

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import { SHORT_MOVIE_DURATION, URL_REGEX } from "../../utils/constants";


function App() {
  const history = useHistory();
  const headerEndpoints = ["/", "/movies", "/saved", "/me"];
  const footerEndpoints = ["/movies", "/saved", "/"];

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isPreloader, setIsPreloader] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      handleSignOut();
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loadedMovies"))) {
      if (localStorage.getItem("loadedMovies")) {
        setAllMovies(JSON.parse(localStorage.getItem("loadedMovies")));
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("searchedMovies") && localStorage.getItem("checkboxStatus")) {
      const checkboxStatus = JSON.parse(localStorage.getItem("checkboxStatus"));
      handleCheckboxMovies(checkboxStatus);
    }
  }, []);

  useEffect(() => {
    if (loggedIn && currentUser) {
      getSavedMovies();
    }
  }, [loggedIn, currentUser]);


  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi.getUserInfo()
        .then((res) => {
          if (res) {
            setCurrentUser({
              name: res.name,
              email: res.email,
              _id: res._id
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          if (err.status === 401) {
            handleSignOut();
          } else {
            handleSignOut();
          }
        });
    }
  }

  // Регистрация пользователя
  function handleRegister({ name, password, email }) {
    setIsLoading(true);
    auth.registration({ name, password, email })
      .then(() => {
        console.log('успешно зареган');
        handleLogin({ password, email });
        history.push('/movies');
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  // Авторизация пользователя
  function handleLogin({ password, email }) {
    return auth
      .authorization({ password, email })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        tokenCheck();
        history.push('/movies');
      })
      .catch((err) => {
        console.log(`Симон у тебя ошибка ${err}`);
      })
  };


  //Выход из системы, удаляем всё из localStorage
  const handleSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", _id: "" });
    setFoundMovies([]);
    setAllMovies([]);
    setSavedMovies([]);
    history.push("/");
  }

  const handleOpenBurgerMenu = () => {
    setIsBurgerPopupOpen(true);
  };
  const closePopup = () => {
    setIsBurgerPopupOpen(false);
  };

  // Обновление данных пользователя
  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .updateUserInfo({ name, email })
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email
        });
        alert('Данные пользователя успешно редактированы');
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        alert('Ошибка редактирования');
      })
  }

  // Поиск фильмов
  function handleSearchMovies(movie, checked) {
    if (allMovies.length !== 0) {
      const searchMovies = allMovies.filter((item) =>
        item.nameRU.toLowerCase().includes(movie.toLowerCase()));

      if (searchMovies.length === 0) {
        alert('По вашему запросу ничего не найдено');
      } else {
        localStorage.setItem("searchWord", movie);
        localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
        localStorage.setItem("checkboxStatus", JSON.stringify(checked));
        setFoundMovies(searchMovies);
      }
    } else {
      setIsPreloader(true);

      moviesApi.getInitialMovies()
        .then((requestMovies) => {
          requestMovies = requestMovies.map((item) => {
            if (!URL_REGEX.test(item.trailerLink)) {
              item.trailerLink = 'https://www.youtube.com';
            }
            return item;
          });

          const searchMovies = requestMovies.filter((item) =>
            item.nameRU.toLowerCase().includes(movie.toLowerCase()));

          if (searchMovies.length === 0) {
            alert('По вашему запросу ничего не найдено');
          } else {
            localStorage.setItem("loadedMovies", JSON.stringify(requestMovies));
            setAllMovies(requestMovies);
            localStorage.setItem("searchWord", movie);
            localStorage.setItem("searchedMovies", JSON.stringify(searchMovies));
            localStorage.setItem("checkboxStatus", JSON.stringify(checked));
            setFoundMovies(searchMovies);
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => setIsPreloader(false));
    }
  }

  // Поиск короткометражек, управление чекбоксом
  function handleCheckboxMovies(checkbox) {
    let shortMovies;

    let movies = JSON.parse(localStorage.getItem("searchedMovies"));

    if (checkbox) {
      shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE_DURATION);
    } else if (!checkbox) {
      shortMovies = movies;
    }
    setFoundMovies(shortMovies);
    localStorage.setItem("checkboxStatus", JSON.stringify(checkbox));
  }

  const handleSaveMovie = (movie) => {
    mainApi
      .createMovie(movie)
      .then((res) => {
        setSavedMovies(savedMovies.concat(res));
        setSavedMoviesList(savedMoviesList.concat(res));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.movieId
    );
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const updatedMoviesList = savedMovies.filter((item) => item._id !== savedMovie._id);
        setSavedMovies(updatedMoviesList);
        setSavedMoviesList(savedMoviesList.filter((item) => item._id !== savedMovie._id));
      })
      .catch((err) => console.log(err));
  };

  // Поиск короткометражек в сохраненных фильмах, управление чекбоксом
  function handleCheckboxSavedMovies(checkbox) {
    if (checkbox) {
      setSavedMovies(savedMovies.filter((item) => item.duration <= SHORT_MOVIE_DURATION));
    } else if (!checkbox) {
      setSavedMovies(savedMoviesList);
    }
  }

  function handleSearchSavedMovie(req) {
    setIsPreloader(true);
    const searchMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(req.toLowerCase()));

    if (searchMovies.length === 0) {
      alert('По вашему запросу ничего не найдено');
      setIsPreloader(false);
    } else {
      setSavedMovies(searchMovies);
      setIsPreloader(false);
    }
  }

  function getSavedMovies() {
    mainApi.getSavedMovies()
      .then((res) => {
        const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(savedMovies);
        setSavedMoviesList(savedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Route exact path={headerEndpoints}>
          <MoviesHeader
            isOpen={isBurgerPopupOpen}
            onOpen={handleOpenBurgerMenu}
            onClose={closePopup}
            loggedIn={loggedIn}
          />
        </Route>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/signup">
            {loggedIn
              ? <Redirect to="/movies" />
              : (
                <Register
                  onRegister={handleRegister}
                  isLoading={isLoading}
                />
              )
            }
          </Route>

          <Route exact path="/signin">
            {loggedIn
              ? <Redirect to="/movies" />
              : (
                <Login
                  onLogin={handleLogin}
                  isLoading={isLoading}
                />
              )
            }
          </Route>

          <ProtectedRoute
            exact path="/me"
            component={Profile}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            onSignout={handleSignOut}
            loggedIn={loggedIn}
          />

          <ProtectedRoute
            exact path="/movies"
            component={Movies}
            onSearch={handleSearchMovies}
            foundMovies={foundMovies}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            onSubmitCheckbox={handleCheckboxMovies}
            preloaderStatus={isPreloader}
          />

          <ProtectedRoute
            exact path="/saved"
            component={SavedMovies}
            onSearch={handleSearchSavedMovie}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            onSubmitCheckbox={handleCheckboxSavedMovies}
            preloaderStatus={isPreloader}
          />

          <Route path="*">
            <PageNotFound />
          </Route>

        </Switch>

        <Route exact path={footerEndpoints}>
          <Footer />
        </Route>

      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
