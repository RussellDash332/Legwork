import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { loginAccount } from '../../api/firebase-auth';

const Login = () => {
    /* Navigation */
    const navigate = useNavigate();
    const [loginToggle, setLoginToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorToggle, setErrorToggle] = useState(false);

    useEffect(() => {
        if (loginToggle) {
            // Firebase Login and authentication
            loginAccount(email, password,
                () => {
                    console.log("login successful");
                    setLoginToggle(false);
                    navigate("/home");
                },
                (errorCode, errorMessage, message) => {
                    console.log("login failed");
                    setLoginToggle(false);
                    setErrorMessage(message);
                    setErrorToggle(true);
                })            
        }
      }, [loginToggle]);
    
    const clickLogin = () => {
        setLoginToggle(true);
    }

    const clickRegister = () => {
        navigate("/register");
    }

    const closeError = () => {
        setErrorMessage('');
        setErrorToggle(false);
    }

    const handleKeypress = (event) => {
        if (event.keyCode === 13) {
            clickLogin();
        }
    }

    /* Text Inputs */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* Hidden Password */
    const [showPassword, setShowPassword] = useState(false);

    const clickShowPassword = () => {
        setShowPassword(!showPassword);
    }  

    return (
        <div className="hero min-h-screen bg-base-200">

            {/* Alert */}
            {(errorToggle) &&
                <div className="alert alert-error shadow-lg sticky top-2 h-min w-2/4 z-10 self-start">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! {errorMessage}</span>
                </div>

                <div className="flex-none">
                    <button className="btn btn-sm btn-ghost" onClick={closeError}>close</button>
                </div>
                </div>
            }

        <div className="hero-content flex-col lg:flex-row-reverse gap-x-16">

            {/* Text */}
            <div className="flex flex-col text-center items-center lg:text-left lg:items-start">
                <div className="bg-base-content p-8 rounded-lg w-80 mb-4">
                    <img src={require('../../resources/LegWork_Logo.png')} className="object-fit"/>
                </div>
                <h1 className="text-5xl font-bold">Welcome to LegWork!</h1>
                <p className="py-6">Start your retail journey on the right foot.</p>
            </div>

            {/* Card */}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">

                {/* Email input */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" 
                    value={email} 
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    onKeyDownCapture={handleKeypress}
                    disabled={loginToggle}/>
                </div>

                {/* Password input */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type={(showPassword) ? "text" : "password"} placeholder="password" className="input input-bordered"
                    value={password} 
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    onKeyDownCapture={handleKeypress}
                    disabled={loginToggle}/>
                {(showPassword)
                ? <AiFillEyeInvisible className="absolute top-44 right-10" onClick={clickShowPassword}/>
                : <AiFillEye className="absolute top-44 right-10" onClick={clickShowPassword}/>}
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                </div>

                {/* Login button */}
                <div className="form-control mt-6">
                    <button className={(!loginToggle) ? "btn btn-primary" : "btn btn-primary loading"} onClick={clickLogin}>Login</button>
                </div>

                {/* Register button */}
                <div className="form-control mt-2">
                <button className={(!loginToggle) ? "btn btn-secondary" : "btn btn-disabled"} onClick={clickRegister}>Register</button>
                </div>
            </div>
            </div>

        </div>
        </div>
    );
}

export default Login;