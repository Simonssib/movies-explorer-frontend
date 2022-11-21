import { BASE_BEATFILMMOVIES_URL } from './constants';

export class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _checkServerResponse(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialMovies = () => {
        return fetch(`${this._url}/beatfilm-movies`, {
            method: 'GET',
        })
            .then(this._checkServerResponse);
    };
}

const moviesApi = new MoviesApi({
    baseUrl: BASE_BEATFILMMOVIES_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;