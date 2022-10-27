import React from "react";
import AnalyticsHeatmap from "./AnalyticsHeatmap";

const LiveTab = () => {
    return (
        <div className="flex flex-col justify-evenly items-center h-full w-full bg-base-200">
            <AnalyticsHeatmap />
        </div>
    );
}

export default LiveTab;