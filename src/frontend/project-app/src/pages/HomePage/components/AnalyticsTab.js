import React, { useEffect, useState } from "react";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import FilterSidebar from "./FilterSidebar";

const AnalyticsTab = () => {

 

    return (
        <div className="flex flex-col justify-evenly items-center no-scrollbar h-full w-full bg-base-200 overflow-y-scroll ">
            
            <br></br>
            <AnalyticsHeatmap />
            <br></br>
            <AnalyticsLineGraph />
            <br></br>
            {/* <FilterSidebar /> */}

        </div>
    );
}

export default AnalyticsTab;

