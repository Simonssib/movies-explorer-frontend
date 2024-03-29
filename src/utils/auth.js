const MAIN_API_URL = 'https://api.simonmovie.nomoredomains.icu';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const registration = ({ name, password, email }) => {
    return fetch(`${MAIN_API_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    }).then(checkResponse);
};

export const authorization = ({ password, email }) => {
    return fetch(`${MAIN_API_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
    }).then(checkResponse);
};

export const checkToken = (token) => {
    return fetch(`${MAIN_API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then(checkResponse);
};
