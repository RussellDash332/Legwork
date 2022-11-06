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
            <div className="tabs bg-base-100">

                <a className={(tabToggle == 0) 
                    ? "tab tab-lg tab-lifted tab-active ml-auto text-content"
                    : "tab tab-lg tab-lifted ml-auto"} 
                    style={{backgroundColor: (tabToggle==0)&&'hsl(var(--b2))'}}
                    onClick={clickLiveTab}>
                        Live
                </a> 
                <a className={(tabToggle == 1) 
                    ? "tab tab-lg tab-lifted tab-active text-content"
                    : "tab tab-lg tab-lifted"}
                    style={{backgroundColor: (tabToggle==1)&&'hsl(var(--b2))'}}
                    onClick={clickAnalyticsTab}>
                        Analytics
                </a> 

            </div>

            {/* Content */}
            <div className="w-full h-full no-scrollbar border-4 border-black">
                {(tabToggle == 0) && <LiveTab /> }
                {(tabToggle == 1) && <AnalyticsTab /> }
            </div>

        </div>
    );
}

export default HomeAnalytics;