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
            <Link to='/' className='burger-menu__link' onClick={onClose}>
              Главная
            </Link>
            <Link to='/movies' className='burger-menu__link' onClick={onClose}>
              Фильмы
            </Link>
            <Link to='/saved' className='burger-menu__link' onClick={onClose}>
              Сохраненные фильмы
            </Link>
          </nav>
          <Link to='/me' className='burger-menu__account-container' onClick={onClose}>
            <p className="burger-menu__account">Аккаунт</p>
            <div className="burger-menu__account-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BurgerMenu;