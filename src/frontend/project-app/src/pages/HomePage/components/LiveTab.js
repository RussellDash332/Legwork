import React from "react";
import AnalyticsHeatmap from "./AnalyticsHeatmap";

const LiveTab = () => {
    return (
        <div className="flex flex-col justify-evenly items-center h-full w-full bg-gray-700 border-black border-8">
            <AnalyticsHeatmap />
        </div>
    );
}

export default LiveTab;