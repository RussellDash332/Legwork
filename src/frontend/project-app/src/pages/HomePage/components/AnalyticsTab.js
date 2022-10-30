import React, { useEffect, useState } from "react";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import FilterSidebar from "./FilterSidebar";

const AnalyticsTab = () => {

 

    return (
        <div className="flex flex-col justify-evenly items-center h-3/4 w-full bg-base-200 no-scrollbar">
            
            <br></br>
            <AnalyticsHeatmap />
            <br></br>
            <AnalyticsLineGraph />
            <br></br>
            <FilterSidebar />
        </div>
    );
}

export default AnalyticsTab;

