import React, { useContext, useEffect, useState } from "react";
import { CameraDataContextProvider } from "./components/CameraDataContext";
import { subscribeUserAvailability } from "../../api/firebase-db";
import { UserContext } from "../ProtectedRoute";

/* Components */
import HomeNew from './components/HomeNew';
import HomeAnalytics from './components/HomeAnalytics';
import HomeSidebar from "./components/HomeSidebar";


const Home = () => {
    const { user } = useContext(UserContext);
    const [availability, setAvailability] = useState(false);

    useEffect(() => {
        subscribeUserAvailability(user.uid, (availability) => {
            console.log("home availaibility", availability);
            setAvailability(availability);
        })

    }, [user])

    return (
        <div className="flex w-screen min-h-screen pl-16">
            {/* nav bar */}
            <HomeSidebar />

            {/* changing screen */}
            <div className="w-full h-screen flex flex-col">
                {(!availability) ? <HomeNew />
                :<CameraDataContextProvider>
                    <HomeAnalytics />
                </CameraDataContextProvider>
                }
            </div>
            
        </div>
    );
}

export default Home;