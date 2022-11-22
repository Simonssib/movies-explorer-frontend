const MOVIES_API_URL = 'https://api.nomoreparties.co';

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getInitialMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
        }).then(this._checkResponse);
    };

    _checkResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
    }
}

const moviesApi = new MoviesApi ({
    baseUrl: MOVIES_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default moviesApi;