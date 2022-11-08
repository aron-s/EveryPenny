import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

function MyProfile() {

    const [token, setToken] = useCookies(['mytoken'])

    let navigate = useNavigate()

    useEffect(() => {
        if(!token['mytoken']) {
            alert('you are not logged in!')
            navigate("/")
        }
    })
    return (
        <div>
           <h1>My profile</h1>
           <h2>Status: Logged in</h2>
        </div>
    )
}

export default MyProfile