import React from 'react';
import { useState, useEffect } from "react";
import {
  Switch, Route, Redirect, useHistory
} from "react-router-dom";
import "../../vendor/normalize.css";
import './app.css';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from '../SavedMovies/SavedMovies';
const headerEndpoints = ["/", "/movies", "/saved", "/me"];
const footerEndpoints = ["/", "/movies", "/saved"];
const SHORT_MOVIE_DURATION = 40;

function App() {
  const history = useHistory();
  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    error: "",
  });
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn && currentUser) {
      getSavedMovies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, currentUser]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser({
            name: res.name,
            email: res.email,
            _id: res._id
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loaded-movies"))) {
      if (localStorage.getItem("loaded-movies")) {
        setMovies(JSON.parse(localStorage.getItem("loaded-movies")));
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("searched-movies") && localStorage.getItem("checkbox-status")) {
      const checkboxStatus = JSON.parse(localStorage.getItem("checkbox-status"));
      submitCheckboxMovies(checkboxStatus);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
    }
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    auth
      .checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res.data);
        history.push("/movies");
      })
      .catch((err) => console.log(err));
  };

  const handleOpenBurgerMenu = () => {
    setIsBurgerPopupOpen(true);
  };

  const closePopup = () => {
    setIsBurgerPopupOpen(false);
  };

  const onLogin = ({ email, password }) => {
    return auth
      .authorization({ email, password })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        history.push("/movies");
      })
      .catch((err) => {
        setErrorMessage({
          error:
            err.includes(401)
              ? "Вы ввели неправильный логин или пароль"
              : "При авторизации произошла ошибка",
        });
        alert(errorMessage.error);
      })
  };

  const onRegister = ({ name, email, password }) => {
    auth
      .registration({ name, email, password })
      .then(() => {
        console.log('Удачно зарегались!');
        onLogin({ email, password });
      })
      .catch((err) => {
        setErrorMessage({
          error:
            err.includes(409)
              ? "Вы ввели уже существующий email"
              : "При регистрации произошла ошибка.",
        });
        alert(errorMessage.error);
      })
  };

  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", _id: "" });
    setSearchedMovies([]);
    setMovies([]);
    setSavedMovies([]);
  };

  const handleUpdateUser = ({ name, email }) => {
    mainApi
      .editUserInfo({ name, email })
      .then((user) => {
        setCurrentUser({
          name: user.name,
          email: user.email
        });
        alert('Данные пользователя успешно редактированы');
      })
      .catch((err) => {
        console.log(err);
        alert('Ошибка редактирования');
      });
  };

  // Поиск фильмов
  const handleSearchMovie = (movie, checked) => {
    if (movies.length !== 0) {
      const searchMovies = movies.filter((item) =>
        item.nameRU.toLowerCase().includes(movie.toLowerCase()));

      if (searchMovies.length === 0) {
        alert('По вашему запросу ничего не найдено');
      } else {
        localStorage.setItem("search-word", movie);
        localStorage.setItem("searched-movies", JSON.stringify(searchMovies));
        localStorage.setItem("checkbox-status", JSON.stringify(checked));
        setSearchedMovies(searchMovies);
      }
    } else {
      setPreloader(true);

      moviesApi.getInitialMovies()
        .then((requestMovies) => {
          requestMovies = requestMovies.map((item) => {
            item.trailerLink = 'https://www.youtube.com';
            return item;
          });

          const searchMovies = requestMovies.filter((item) =>
            item.nameRU.toLowerCase().includes(movie.toLowerCase()));

          if (searchMovies.length === 0) {
            alert('По вашему запросу ничего не найдено');
          } else {
            localStorage.setItem("loaded-movies", JSON.stringify(requestMovies));
            setMovies(requestMovies);
            localStorage.setItem("search-word", movie);
            localStorage.setItem("searched-movies", JSON.stringify(searchMovies));
            localStorage.setItem("checkbox-status", JSON.stringify(checked));
            setSearchedMovies(searchMovies);
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        })
        .finally(() => setPreloader(false));
    }
  };

  const submitCheckboxMovies = (checkbox) => {
    let shortMovies;

    let movies = JSON.parse(localStorage.getItem("searched-movies"));

    if (checkbox) {
      shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE_DURATION);
    } else if (!checkbox) {
      shortMovies = movies;
    }
    setSearchedMovies(shortMovies);
    localStorage.setItem("checkbox-status", JSON.stringify(checkbox));
  };


  const submitCheckboxSaved = (checkbox) => {
    if (checkbox) {
      setSavedMovies(savedMovies.filter((item) => item.duration <= SHORT_MOVIE_DURATION));
    } else if (!checkbox) {
      setSavedMovies(savedMoviesList);
    }
  };


  const handleSaveMovie = (movie) => {
    mainApi
      .saveMovie(movie)
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

  const handleSearchSavedMovie = (req) => {
    setPreloader(true);
    const searchMovies = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(req.toLowerCase()));

    if (searchMovies.length === 0) {
      alert('По вашему запросу ничего не найдено');
      setPreloader(false);
    } else {
      setSavedMovies(searchMovies);
      setPreloader(false);
    }
  };

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((res) => {
        const savedMovies = res.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(savedMovies);
        setSavedMoviesList(savedMovies);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };


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
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            onHandleSearch={handleSearchMovie}
            foundMovies={searchedMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            savedMovies={savedMovies}
            onSubmitCheckbox={submitCheckboxMovies}
            preloader={preloader}
          />

          <ProtectedRoute
            exact
            path="/me"
            component={Profile}
            loggedIn={loggedIn}
            onUpdateUser={handleUpdateUser}
            onLogOut={handleLogOut}
          />

          <ProtectedRoute
            exact
            path="/saved"
            component={SavedMovies}
            loggedIn={loggedIn}
            onHandleSearch={handleSearchSavedMovie}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            savedMovies={savedMovies}
            preloader={preloader}
            onSubmitCheckbox={submitCheckboxSaved}
          />

          <Route exact path="/">
            <Main />
          </Route>

          <Route exact path="/signup">
            <Register
              onRegister={onRegister}
            />
          </Route>

          <Route exact path="/signin">
            <Login
              onLogin={onLogin}
            />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
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
