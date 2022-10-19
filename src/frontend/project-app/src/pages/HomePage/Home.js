import React, { useEffect, useState } from "react";


/* Components */
import HomeNew from './components/HomeNew';
import HomeAnalytics from './components/HomeAnalytics';
import HomeSidebar from "./components/HomeSidebar";

const Home = () => {

    return (
        <div className="flex w-screen min-h-screen pl-16">
            {/* nav bar */}
            <HomeSidebar />

            {/* changing screen */}
            <div className="w-full flex flex-col">
                {/* <HomeNew /> */}
                <HomeAnalytics />
            </div>
            
        </div>
    );
}

export default Home;