import React from 'react';
import { useState, useEffect } from "react";
import {
  Switch, Route, Redirect, useHistory, useLocation
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from '../SavedMovies/SavedMovies';
import Preloader from '../Movies/Preloader/Preloader';
const headerEndpoints = ["/", "/movies", "/saved", "/me"];
const footerEndpoints = ["/", "/movies", "/saved"];
const SHORT_MOVIE_DURATION = 40;

function App() {
  const history = useHistory();
  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([me, movies]) => {
          setCurrentUser(me);
          setSavedMovies(movies.filter((film) => film.owner === me._id));
        })
        .catch((err) => console.log(err))
        //.finally();
    }
  }, [loggedIn]);

  useEffect(() => {
    setSavedMoviesList(savedMovies);
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("searched-movies") && localStorage.getItem("checkbox-status")) {
      const checkboxStatus = JSON.parse(localStorage.getItem("checkbox-status"));
      submitCheckboxMovies(checkboxStatus);
    }
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loaded-movies"))) {
      if (localStorage.getItem("loaded-movies")) {
        setMovies(JSON.parse(localStorage.getItem("loaded-movies")));
      }
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      handleLogOut();
      setIsTokenChecked(true);
      console.log('Вышло, потому что токена нет')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    auth
      .checkToken(token)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
          _id: res._id
        });
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        //handleLogOut();

      })
      .finally(() => {
        setIsTokenChecked(true)
      });
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
        setIsTokenChecked(true);
        history.push("/movies");
      })
      .catch((err) => {
        err.includes(401)
          ? alert("Вы ввели неправильный логин или пароль")
          : alert("При авторизации произошла ошибка");
      });
  };

  const onRegister = ({ name, email, password }) => {
    auth
      .registration({ name, email, password })
      .then(() => {
        console.log('Удачно зарегались!');
        onLogin({ email, password });
      })
      .catch((err) => {
        err.includes(401)
          ? alert("Вы ввели неправильный логин или пароль")
          : alert("При авторизации произошла ошибка");
      });
  };

  const handleLogOut = () => {
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", _id: "" });
    setSearchedMovies([]);
    setMovies([]);
    setSavedMovies([]);
    setSavedMoviesList([]);
    setIsTokenChecked(false);
    localStorage.clear();
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

  const searchMovies = (movies, name) => {
    const moviesArray = movies.filter((item) =>
      item.nameRU.toLowerCase().includes(name.toLowerCase())
    );
    if (location.pathname === "/movies" && moviesArray.length === 0) {
      alert("Ничего не найдено");
    }

    if (location.pathname === "/saved" && moviesArray.length === 0) {
      alert("Ничего не найдено");
    }
    return moviesArray;
  };

  const handleSearchMovie = (movie, checked) => {
    if (!JSON.parse(localStorage.getItem("loaded-movies"))) {
      moviesApi.getInitialMovies()
        .then((movies) => {
          const beforeMovie = movies.slice(0, 23);
          const afterMovie = movies.slice(24);
          const arrMovies = beforeMovie.concat(afterMovie);
          localStorage.setItem("loaded-movies", JSON.stringify(arrMovies));
        })
        .then(() => {
          setPreloader(true);
          const resultArray = searchMovies(
            JSON.parse(localStorage.getItem("loaded-movies")),
            movie
          );
          setMovies(resultArray);
          localStorage.setItem("searched-movies", JSON.stringify(resultArray));
          localStorage.setItem("search-word", movie);
          let movies = JSON.parse(localStorage.getItem("searched-movies"));
          let shortMovies;
          if (checked) {
            shortMovies = movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
            setSearchedMovies(shortMovies);
          } else if (!checked) {
            setSearchedMovies(resultArray);
          }
          localStorage.setItem("checkbox-status", JSON.stringify(checked));
          setTimeout(() => setPreloader(false), 1000);
        })
        .catch((err) => {
          console.error(err);
        })
    } else if (JSON.parse(localStorage.getItem("loaded-movies"))) {
      setPreloader(true);
      const resultArray = searchMovies(
        JSON.parse(localStorage.getItem("loaded-movies")),
        movie
      );
      setMovies(resultArray);
      localStorage.setItem("search-word", movie);
      localStorage.setItem("searched-movies", JSON.stringify(resultArray));
      let movies = JSON.parse(localStorage.getItem("searched-movies"));
      let shortMovies;
      if (checked) {
        shortMovies = movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
        setSearchedMovies(shortMovies);
      } else if (!checked) {
        setSearchedMovies(resultArray);
      }
      localStorage.setItem("checkbox-status", JSON.stringify(checked));
      setTimeout(() => setPreloader(false), 1000);
    }
  }

  const submitCheckboxMovies = (checkbox) => {
    let shortMovies;

    let movies = JSON.parse(localStorage.getItem("searched-movies"));

    if (checkbox) {
      shortMovies = movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    } else if (!checkbox) {
      shortMovies = movies;
    }
    localStorage.setItem("checkbox-status", JSON.stringify(checkbox));
    setSearchedMovies(shortMovies);
  };



  const submitCheckboxSaved = (checkbox) => {
    if (checkbox) {
      setSavedMoviesList(savedMovies.filter((item) => item.duration <= SHORT_MOVIE_DURATION));
    } else if (!checkbox) {
      setSavedMoviesList(savedMovies);
    }
    localStorage.setItem("checkbox-status-saved", JSON.stringify(checkbox));
  };


  const handleSaveMovie = (movie) => {
    const isSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
    if (isSaved) {
      handleDeleteMovie(movie._id);
    } else {
      mainApi
        .saveMovie(movie)
        .then((res) => {
          setSavedMovies(savedMovies.concat(res));
          //setSavedMoviesList(savedMoviesList.concat(res));
        })
        .catch((err) => console.log(err));
    }
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
        //setSavedMoviesList(savedMoviesList.filter((item) => item._id !== savedMovie._id));
      })
      .catch((err) => console.log(err));
  };


  const handleSearchSavedMovie = (req, checked) => {
    setPreloader(true);
    const resultArray = savedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(req.toLowerCase()));
    let shortMovies;

    if (resultArray.length === 0) {
      alert('По вашему запросу ничего не найдено');
      setPreloader(false);
    } else
      if (checked) {
        shortMovies = resultArray.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
        setSavedMoviesList(shortMovies);
        setPreloader(false);
      } else {
        setSavedMoviesList(resultArray);
        setPreloader(false);
      }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Route exact path={headerEndpoints}>
          <Header
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
              ? <Redirect to="/" />
              : (
                <Register
                  onRegister={onRegister}
                />
              )
            }
          </Route>

          <Route exact path="/signin">
            {loggedIn
              ? <Redirect to="/" />
              : (
                <Login onLogin={onLogin} />
              )
            }
          </Route>

          <Route exact path="/movies">
            {isTokenChecked ? (
              <ProtectedRoute
                component={Movies}
                movies={movies}
                loggedIn={loggedIn}
                onHandleSearch={handleSearchMovie}
                foundMovies={searchedMovies}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                savedMovies={savedMovies}
                onSubmitCheckbox={submitCheckboxMovies}
                preloader={preloader}
              />
            ) : (
              <Preloader />
            )
            }
          </Route>

          <Route exact path="/saved">
            {isTokenChecked ? (
              <ProtectedRoute
                component={SavedMovies}
                loggedIn={loggedIn}
                onHandleSearch={handleSearchSavedMovie}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                savedMovies={savedMovies}
                foundMovies={savedMoviesList}
                preloader={preloader}
                onSubmitCheckbox={submitCheckboxSaved}
              />
            ) : (
              <Preloader />
            )
            }
          </Route>

          <Route exact path="/me">
            {isTokenChecked ? (
              <ProtectedRoute
                component={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                onLogOut={handleLogOut}
              />
            ) : (
              <Preloader />
            )
            }
          </Route>

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
