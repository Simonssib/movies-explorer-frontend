export const BASE_URL = 'https://api.simonmovie.nomoredomains.icu';

export const BASE_BEATFILMMOVIES_URL = 'https://api.nomoreparties.co';

// Размеры экрана устройств
export const DEVICE_WIDTH_1280 = 1280;
export const DEVICE_WIDTH_1100 = 1100;
export const DEVICE_WIDTH_1101 = 1101;
export const DEVICE_WIDTH_768 = 768;
export const DEVICE_WIDTH_625 = 625;
export const DEVICE_WIDTH_480 = 480;
export const DEVICE_WIDTH_320 = 320;

export const MAX_CARDS = 120;

// количество фильмов, отображаемое при нажатии кнопки "Еще"
export const ADD_CARDS_320 = 2;
export const ADD_CARDS_768 = 2;
export const ADD_CARDS_1280 = 3;
export const ADD_CARDS_DEFAULT = 4;

// Количество карточек, которые отображаются на странице при поиске
export const SEARCH_CARDS_320 = 5;
export const SEARCH_CARDS_625 = 8;
export const SEARCH_CARDS_1101 = 12;
export const SEARCH_CARDS_DEFAULT = 12;

// Длительность короткометражек
export const SHORT_MOVIE_DURATION = 40;

export const URL_REGEX = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/;

export function handleMovieDuration(duration, movie) {
    if (duration === 60) {
        return `1 ч`;
    }

    if (duration === 120) {
        return `2 ч`;
    }

    if (duration > 120) {
        return `2 ч ${movie.duration - 120} м`;
    }

    if (duration > 60 && duration < 120) {
        return `1 ч ${movie.duration - 60} м`;
    }

    if (duration < 60) {
        return `${movie.duration} м`;
    }
}
