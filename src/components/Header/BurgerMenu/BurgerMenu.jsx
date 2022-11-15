import React from 'react';
import { Link } from 'react-router-dom';
import './burgerMenu.css';

function BurgerMenu({ isOpen, onClose }) {

  return (
    <section className={`burger-menu__wrapper ${isOpen ? "burger-menu__wrapper_opened" : ""}`}>
      <div className='burger-menu'>
        <div className='burger-menu__container'>
          <button
            className='burger-menu__close-icon'
            type='button'
            onClick={onClose}
          />
          <nav className='burger-menu__link-wrapper'>
            <Link to='/' className='burger-menu__link'>
              Главная
            </Link>
            <Link to='/movies' className='burger-menu__link'>
              Фильмы
            </Link>
            <Link to='/saved' className='burger-menu__link'>
              Сохраненные фильмы
            </Link>
          </nav>
          <Link to='/profile' className='burger-menu__account-container'>
            <p className="burger-menu__account">Аккаунт</p>
            <div className="burger-menu__account-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BurgerMenu;