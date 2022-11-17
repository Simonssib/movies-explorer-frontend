import React from 'react';
import { useState } from "react";
import {
  Switch, Route,
} from "react-router-dom";
import "../../vendor/normalize.css";
import './app.css';
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

  const handleOpenBurgerMenu = () => {
    setIsBurgerPopupOpen(true);
    console.log('nazhata knopka');
  };
  const closePopup = () => {
    setIsBurgerPopupOpen(false);
  };

  return (
    <div className='page'>
      <Switch>

        <Route exact path="/">
          <Main />
          <Footer />
        </Route>

        <Route exact path="/signup">
          <Register />
        </Route>

        <Route exact path="/signin">
          <Login />
        </Route>

        <Route exact path="/movies">
          <MoviesHeader
            isOpen={isBurgerPopupOpen}
            onOpen={handleOpenBurgerMenu}
            onClose={closePopup}
          />
          <Movies />
          <Footer />
        </Route>

        <Route exact path="/me">
          <MoviesHeader
            isOpen={isBurgerPopupOpen}
            onOpen={handleOpenBurgerMenu}
            onClose={closePopup}
          />
          <Profile />
        </Route>

        <Route exact path="/saved">
          <MoviesHeader
            isOpen={isBurgerPopupOpen}
            onOpen={handleOpenBurgerMenu}
            onClose={closePopup}
          />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>
    </div>
  );
};

export default App;
