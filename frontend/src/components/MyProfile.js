import React, {useState, useEffect} from 'react';
import APIService from '../APIService';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
import './myStyles.css';
import logo from './images/everypennylogo.png';

function MyProfile() {

    const [token, setToken, removeToken] = useCookies(['mytoken'])

    let navigate = useNavigate()

    useEffect(() => {
        if(!token['mytoken']) {
            alert('you are not logged in!')
            navigate("/")
        }
    }, [token])

    const logoutBtn = () => {
        removeToken(['mytoken'])
        alert('logging out.')
        navigate("/")
    }

    return (
        <div>
           <h1 className='myprof'>My profile</h1> 
           <h2 className='status'>Status: Logged in</h2>
           <img className = 'logo'src={logo} alt="logo"/>
           <button className = 'logredir' onClick={logoutBtn}>Logout</button>
        </div>
    )
}

export default MyProfile