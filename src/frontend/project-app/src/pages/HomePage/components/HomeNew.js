import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const HomeNew = () => {

    return (
        <div className="hero min-h-screen w-full bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Welcome to [LegWork]. You have not set up any projects yet. dqwd</p>
            <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
        </div>
    );
}

export default HomeNew;