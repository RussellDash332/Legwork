import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { logoutAccount } from "../../../api/firebase-auth";
import { IoMdContact, IoMdSettings, IoMdExit, IoIosSunny, IoMdMoon } from "react-icons/io";

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


    const [theme, setTheme] = useState(localStorage.getItem("theme"));

    const changeTheme=()=>{
        const htmlElement = document.querySelector('html')

        if(theme !== "dark"){
          htmlElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
          setTheme("dark");
        } else {
          htmlElement.setAttribute("data-theme", "winter");
          localStorage.setItem("theme", "winter");
          setTheme("winter");
        }
    }


    return (
        <div className="fixed top-0 left-0 h-screen w-16 z-20
                        flex flex-col
                        bg-base-300 text-white shadow-lg">

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

            <div className="mt-auto">
                <div className="sidebar-icon group" onClick={changeTheme}>
                    {(theme === "dark") 
                    ? <IoIosSunny className="h-6 w-6"/>
                    : <IoMdMoon className="h-6 w-6"/>}
                    <span className="sidebar-tooltip group-hover:scale-100">
                        Toggle Theme
                    </span>
                </div>
                
                <div className="sidebar-icon group" onClick={clickLogout}>
                    <IoMdExit className="h-6 w-6" />
                    <span className="sidebar-tooltip group-hover:scale-100">
                        Sign Out
                    </span>
                </div>
            </div>
            
        </div>
    );
}

export default HomeSidebar;