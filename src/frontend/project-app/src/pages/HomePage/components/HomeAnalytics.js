import React, { useEffect, useState } from "react";

import LiveTab from "./LiveTab";
import AnalyticsTab from "./AnalyticsTab";

const HomeAnalytics = () => {
    const [tabToggle, setTabToggle] = useState(0);

    const clickLiveTab = () => {
        setTabToggle(0); 
    }

    const clickAnalyticsTab = () => {
        setTabToggle(1);
    }

    return (
        <div className="flex flex-col min-h-screen w-full h-screen border-red-500 border-8">       
            {/* Tab bar */}
            <div className="tabs bg-red-100">
                <a className={(tabToggle == 0) 
                    ? "tab tab-lg tab-lifted tab-active"
                    : "tab tab-lg tab-lifted"} 
                    onClick={clickLiveTab}>
                        Live
                </a> 
                <a className={(tabToggle == 1) 
                    ? "tab tab-lg tab-lifted tab-active"
                    : "tab tab-lg tab-lifted"} 
                    onClick={clickAnalyticsTab}>
                        Analytics
                </a> 
            </div>

            {/* Content */}
            <div className="w-full h-full bg-green-100 border-green-500 border-8">
                {(tabToggle == 0) && <LiveTab /> }
                {(tabToggle == 1) && <AnalyticsTab /> }
            </div>

        </div>
    );
}

export default HomeAnalytics;