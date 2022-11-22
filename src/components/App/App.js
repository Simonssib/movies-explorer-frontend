/* eslint-disable react-hooks/exhaustive-deps */
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
//import moviesApi from '../../utils/MoviesApi';
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);

  const handleOpenBurgerMenu = () => {
    setIsBurgerPopupOpen(true);
    console.log('nazhata knopka');
  };

  const closePopup = () => {
    setIsBurgerPopupOpen(false);
  };

  const history = useHistory();

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
  }

  useEffect(() => {
    checkToken();
  }, []);

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

  const onLogin = ({ email, password }) => {
    return auth
      .authorization({ email, password })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        alert("Что-то пошло не так! Попробуйте ещё раз.");
      })
  }

  const onRegister = ({ name, email, password }) => {
    auth
      .registration({ name, email, password })
      .then(() => {
        console.log('Удачно зарегались!');
        onLogin({ email, password });
      })
      .catch((err) => {
        console.log(err);
        alert("Что-то пошло не так! Попробуйте ещё раз.");
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <MoviesHeader
          isOpen={isBurgerPopupOpen}
          onOpen={handleOpenBurgerMenu}
          onClose={closePopup}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
          />

          <ProtectedRoute
            exact
            path="/me"
            component={Profile}
            loggedIn={loggedIn}
          />

          <ProtectedRoute
            exact
            path="/saved"
            component={SavedMovies}
            loggedIn={loggedIn}
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

        <Footer

        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
