import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { createAccount } from "../../api/firebase-auth";

import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";

const Register = () => {
    /* Navigation */
    const navigate = useNavigate();
    const [createToggle, setCreateToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorToggle, setErrorToggle] = useState(false);

    useEffect(() => {
        if (!passwordMatch) {
            setErrorMessage('Passwords do not match.');
            setErrorToggle(true);
            setCreateToggle(false);
        } else if (createToggle) {
            // Firebase Create account
            createAccount(username, email, confirmPassword,
                () => {
                    console.log('register successful');
                    setCreateToggle(false);
                    navigate("/home");
                },
                (errorCode, errorMessage, message) => {
                    console.log('register failed');
                    setCreateToggle(false);
                    setErrorMessage(message);
                    setErrorToggle(true);
                });
        } 
    }, [createToggle])

    const clickCreate = () => {
        setCreateToggle(true);
    }

    const clickBack = () => {
        navigate("/login");
    }

    const closeError = () => {
        setErrorMessage('');
        setErrorToggle(false);
    }

    const handleKeypress = (event) => {
        if (event.keyCode === 13) {
            clickCreate();
        }
    }

    /* Text Inputs */
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    /* Password Match + Error Message */
    const [passwordMatch, setPasswordMatch] = useState('true');
    const [inputHighlight, setInputHighlight] = useState('input input-bordered');

    useEffect(() => {
        if (password == confirmPassword) {
            setPasswordMatch(true);
            setInputHighlight('input input-bordered');
        } else {
            setPasswordMatch(false);
            setInputHighlight('input input-bordered input-error');
        }
    }, [password, confirmPassword])

    /* Hidden Password */
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const clickShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    }

    const clickShowPassword2 = () => {
        setShowPassword2(!showPassword2);
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

        <div className="hero-content flex-col lg:flex-row gap-x-16">

            {/* Text */}
            <div className="text-center lg:text-right">
            <h1 className="text-5xl font-bold">Create an Account</h1>
            <p className="py-6">Start your journey with us!</p>
            
            <p>{username}</p>
            <p>{email}</p>
            <p>{password}</p>
            <p>{confirmPassword}</p>
            </div>

            {/* Card */}
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">

                {/* Username input */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="username" className="input input-bordered" 
                    value={username} 
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    onKeyDownCapture={handleKeypress}
                    disabled={createToggle}/>
                </div>

                {/* Email input */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" 
                    value={email} 
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    onKeyDownCapture={handleKeypress}
                    disabled={createToggle}/>
                </div>

                {/* Password input */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                    {(showPassword1)
                    ? <AiFillEyeInvisible className="absolute right-10" style={{top: "16.75rem"}} onClick={clickShowPassword1}/>
                    : <AiFillEye className="absolute right-10" style={{top: "16.75rem"}} onClick={clickShowPassword1}/>}
                </label>
                <input type={(showPassword1) ? "text" : "password"} placeholder="password" className="input input-bordered" 
                    value={password} 
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    onKeyDownCapture={handleKeypress}
                    disabled={createToggle}/>
                </div>

                {/* Confirm password input */}
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                    {(showPassword2)
                    ? <AiFillEyeInvisible className="absolute right-10" style={{top: "22.5rem"}} onClick={clickShowPassword2}/>
                    : <AiFillEye className="absolute right-10" style={{top: "22.5rem"}} onClick={clickShowPassword2}/>}
                </label>
                <input type={(showPassword2) ? "text" : "password"} placeholder="confirm password" className={inputHighlight}
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                    onKeyDownCapture={handleKeypress}
                    disabled={createToggle}/>
                {(!passwordMatch) && <label className="label">
                <span className="label-text-alt text-red-400">Passwords do not match!</span>
                </label>}
                </div>

                {/* Terms & Policy Text */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">By proceeding and tapping on Create Account, you agree to LegWorks's <a  href="#termsOfService" className="label-text link">
                            Terms of Service </a> and <a href="#privacyPolicy" className="label-text link"> Privacy Policy</a>.
                        </span>
                    </label>
                </div>
                
                {/* Create account button */}
                <div className="form-control mt-6">
                <button className={(!createToggle) ? "btn btn-primary" : "btn btn-primary loading"} onClick={clickCreate}>CREATE ACCOUNT</button>
                </div>

                {/* Back button */}
                <div className="form-control mt-2">
                <button className={(!createToggle) ? "btn btn-outline btn-secondary" : "btn btn-secondary btn-disabled"} onClick={clickBack}>BACK TO LOGIN</button>
                </div>

                {/* Popup Modals */}
                <TermsOfService />
                <PrivacyPolicy />

            </div>
            </div>

        </div>
        </div>
    );
}

export default Register;