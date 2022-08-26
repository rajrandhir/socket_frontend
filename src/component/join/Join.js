import React, { useState } from 'react'
import "./Join.css";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";



export let user;
const Join = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [gmailRes, setGmailRes] = useState('');
    console.log(gmailRes)


    const navigate = useNavigate();
    console.log(name.length)
    const handleChange = (e) => {
        setName(e.target.value);
        e.target.value.trim().length > 0 && setError("")
    }


    const successRes = (res) => {
        setGmailRes(res.profileObj.name);

    }


    const FailRes = (res) => {
        console.log(res, 'Fail res')
    }





    const sendUser = (e) => {
        user = name;
        if (name) {
            setError("")
            name.trim() && (navigate('/chat'))
        }
        else {
            setError('input filedl is required!!')
        }
    }
    if (user = gmailRes) {
        navigate('/chat')
    }



    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logo} alt="logo" />
                <h1>GROUP CHAT</h1>
                <div className='main-input'>
                    <input autoComplete='off' value={name} onInput={(e) => handleChange(e)} placeholder="Enter Your Name" type="text" id="joinInput"
                        onKeyDown={(event) => event.key === 'Enter' ? sendUser() : null}
                    />
                    <span><p>{error}</p></span>
                </div>
                <button onClick={sendUser} className="joinbtn">Login In</button>
                <div className='googlebtn'>
                    <GoogleLogin
                        clientId="389177768631-1o887m293ih94no0e7aavo7nc6jdqool.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={successRes}
                        onFailure={FailRes}
                        cookiePolicy={'single_host_origin'}
                    />

                </div>
            </div>
        </div>
    )
}

export default Join;
