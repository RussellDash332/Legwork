import React, { useEffect, useState } from "react";

const HomeAnalytics = () => {
    return (
        <div className="flex flex-col min-h-screen w-full h-screen">       
            {/* Tab bar */}
            <div className="tabs bg-base-100 z-10">

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
            <div className="w-full h-full">
                {(tabToggle == 0) && <LiveTab /> }
                {(tabToggle == 1) && <AnalyticsTab /> }
            </div>

        </div>
    );
}

export default HomeAnalytics;