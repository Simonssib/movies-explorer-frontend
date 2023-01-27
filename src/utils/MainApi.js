const MAIN_API_URL = 'https://api.simonmovie.nomoredomains.icu';
const MOVIES_API_URL = 'https://api.nomoreparties.co';

class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    editUserInfo(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                email: user.email,
            })
        }).then(this._checkResponse);
    }

    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `${MOVIES_API_URL}/${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `${MOVIES_API_URL}/${movie.image.url}`,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                movieId: movie.id,
            }),
        }).then(this._checkResponse);
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }).then(this._checkResponse);
    }

    _checkResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
    }
}

const mainApi = new MainApi ({
    baseUrl: MAIN_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default mainApi;