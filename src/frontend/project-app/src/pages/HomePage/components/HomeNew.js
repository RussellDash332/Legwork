import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const HomeNew = () => {
    const navigate = useNavigate();

    const clickConfigure = () => {
        navigate("/configuration");
    }

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Welcome to [LegWork]. You have not set up any projects yet.</p>
            <button className="btn btn-primary" onClick={clickConfigure}>Get Started</button>
            </div>
        </div>
        </div>
    );
}

export default HomeNew;