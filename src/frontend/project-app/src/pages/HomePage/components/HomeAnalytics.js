import React, { useEffect, useState } from "react";

import LiveTab from "./LiveTab";
import AnalyticsTab from "./AnalyticsTab";
import colorObject from "daisyui/src/colors";

const HomeAnalytics = () => {
    const [tabToggle, setTabToggle] = useState(0);

    const clickLiveTab = () => {
        setTabToggle(0); 
    }

    const clickAnalyticsTab = () => {
        setTabToggle(1);
    }

    return (
        <div className="flex flex-col min-h-screen w-full h-screen">       
            {/* Tab bar */}
            <div className="tabs bg-gray-600">
                <a className={(tabToggle == 0) 
                    ? "tab tab-lg tab-lifted tab-active bg-red-300"
                    : "tab tab-lg tab-lifted"} 
                    style={{marginLeft: 'auto'}}
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
            <div className="w-full h-full bg-green-100">
                {(tabToggle == 0) && <LiveTab /> }
                {(tabToggle == 1) && <AnalyticsTab /> }
            </div>

        </div>
    );
}

export default HomeAnalytics;