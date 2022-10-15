import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logoutAccount } from "../../api/firebase-auth";

/* Components */
import HomeNew from "./components/HomeNew";

const Home = () => {
    /* Navigation */
    const navigate = useNavigate();
    const [logoutToggle, setLogoutToggle] = useState(false);

    useEffect(() => {
        if (logoutToggle) {
            logoutAccount(() => {
                setLogoutToggle(false);
                navigate("/login");
            },
            () => {
                console.log("failed to logout");
            })
        }
    }, [logoutToggle])

    const clickLogout = () => {
        setLogoutToggle(true);
    }

    return (
        <div>
            <HomeNew />
        </div>
    );
}

export default Home;