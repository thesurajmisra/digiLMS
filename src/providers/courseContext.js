import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import app_config from "../config";

export const CourseContext = createContext();

export const CourseProvider = props => {

    const url = app_config.api_url + '/course';

    useEffect(() => {


    }, [])

    const addCourse = data => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        return fetch(url + '/add', requestOptions)
            .then(response => response.json());
    }

    const getUserByEmail = email => {

        return fetch(url + '/getbyemail/' + email)
            .then(response => response.json());
    }

    const uploadFile = data => {
        const requestOptions = {
            method: 'POST',
            body: data
        }

        return fetch(app_config.api_url + '/util/uploadfile', requestOptions)
            .then(response => response.json());
    }

    const toProvide = {
        addCourse,
        uploadFile
    }

    return (
        <CourseContext.Provider value={toProvide}>
            {props.children}
        </CourseContext.Provider>
    )

}