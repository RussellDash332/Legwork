import React from "react";

import Heatmap from "./Heatmap";

const AnalyticsHeatmap = () => {
    return (
        <div className="card w-10/12 min-h-half shadow-xl bg-base-200">
            <div>
                <Heatmap />
                {/* heatmap */}
            </div>
        </div>
    );
}

export default AnalyticsHeatmap;