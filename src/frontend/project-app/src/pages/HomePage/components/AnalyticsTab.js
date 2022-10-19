import React from "react";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";

const AnalyticsTab = () => {
    return (
        <div className="flex flex-col justify-evenly content-center h-screen bg-slate-500">
            {/* AnalyticsTab */}
            <AnalyticsHeatmap />
            <AnalyticsLineGraph />
        </div>
    );
}

export default AnalyticsTab;