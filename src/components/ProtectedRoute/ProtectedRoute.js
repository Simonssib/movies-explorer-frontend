import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('jwt')) {
            setLoggedIn(false);
        }
    }, []);

    return (
        <Route>
            {
                () => loggedIn ? <Component {...props} /> : <Redirect to="/" />
            }
        </Route>
    )
};

export default ProtectedRoute;