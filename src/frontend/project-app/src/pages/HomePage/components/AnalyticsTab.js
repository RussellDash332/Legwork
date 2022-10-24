import React from "react";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";

const AnalyticsTab = () => {
    return (
        <div className="flex flex-col justify-evenly items-center h-full w-full bg-slate-200 border-black border-8">
            {/* AnalyticsTab */}
            <AnalyticsHeatmap /> 
            <br></br>
            <AnalyticsLineGraph />
        </div>
    );
}

export default AnalyticsTab;