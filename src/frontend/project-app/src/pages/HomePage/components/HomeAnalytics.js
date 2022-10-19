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

    const clickTab3 = () => {
        setTabToggle(2);
    }

    return (
        <div className="min-h-screen h-full w-full bg-blue-200">

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
                <a className={(tabToggle == 2) 
                    ? "tab tab-lg tab-lifted tab-active"
                    : "tab tab-lg tab-lifted"} 
                    onClick={clickTab3}>
                        Tab 3
                </a>
            </div>

            {/* Content */}
            <div classname="w-screen h-screen bg-green-400">
                {(tabToggle == 0) && <LiveTab /> }
                {(tabToggle == 1) && <AnalyticsTab /> }
                {(tabToggle == 2) && <div> Tab 3</div> }
            </div>


        </div>
    );
}

export default HomeAnalytics;