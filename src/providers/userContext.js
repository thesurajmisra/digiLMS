import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useHistory } from "react-router";
import app_config from "../config";

export const UserContext = createContext();

export const UserProvider = props => {

    const url = app_config.api_url + '/user';

    const [loggedin, setLoggedin] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const history = useHistory();


    useEffect(() => {
        let user = sessionStorage.getItem('user');
        if (user) {
            setLoggedin(true);
            setCurrentUser(JSON.parse(user));
        }

    }, [])

    const addUser = data => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        return fetch(url + '/add', requestOptions)
            .then(response => response.json());
    }

    const purchaseCourse = (id, data) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        return fetch(url + '/pushupdate/' + id, requestOptions)
            .then(response => response.json());
    }

    const deleteUser = id => {
        const requestOptions = {
            method: 'DELETE'
        }

        return fetch(url + '/delete/' + id, requestOptions)
            .then(response => response.json());
    }

    const getUserByEmail = email => {

        return fetch(url + '/getbyemail/' + email)
            .then(response => response.json());
    }

    const getAll = () => {

        return fetch(url + '/getall')
            .then(response => response.json());
    }


    const Logout = () => {
        sessionStorage.removeItem('user');
        setLoggedin(false);
        setCurrentUser(null);
        history.push('/main/login');
    }

    const toProvide = {
        loggedin,
        currentUser,

        setLoggedin,
        setCurrentUser,

        addUser,
        getAll,
        getUserByEmail,
        deleteUser,
        purchaseCourse,
        Logout
    }

    return (
        <UserContext.Provider value={toProvide}>
            {props.children}
        </UserContext.Provider>
    )

}