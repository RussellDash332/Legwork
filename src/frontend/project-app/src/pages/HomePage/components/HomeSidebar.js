import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logoutAccount } from "../../../api/firebase-auth";
import { IoMdContact, IoMdSettings, IoMdExit } from "react-icons/io";

const HomeSidebar = () => {
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

    const clickConfigure = () => {
        navigate("/configuration");
    }

    return (
        <div className="fixed top-0 left-0 h-screen w-16 z-20
                        flex flex-col
                        bg-gray-700 text-white shadow-lg">

            <div className="sidebar-icon group">
                <IoMdContact className="h-8 w-8" />
                <span className="sidebar-tooltip group-hover:scale-100">
                    Profile
                </span>
            </div>

            <div className="sidebar-icon group" onClick={clickConfigure}>
                <IoMdSettings className="h-6 w-6" />
                <span className="sidebar-tooltip group-hover:scale-100">
                    Configure
                </span>
            </div>

            <div className="sidebar-icon group mt-auto" onClick={clickLogout}>
                <IoMdExit className="h-6 w-6" />
                <span className="sidebar-tooltip group-hover:scale-100">
                    Sign Out
                </span>
            </div>

        </div>
    );
}

const HomeSidebarIcon = ({icon, text = 'tooltip'}) => {
    return (
        <div className="sidebar-icon group">
            {icon}

            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    );
}

export default HomeSidebar;