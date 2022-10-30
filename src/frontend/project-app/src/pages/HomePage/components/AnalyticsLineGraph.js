import React from "react";
import Plot from 'react-plotly.js';
import LineGraph from "./LineGraph"

const AnalyticsLineGraph = () => {
    return (
        <div className="card w-10/12 min-h-half shadow-xl bg-base-200">
            
            <div>
                <LineGraph />
                
            </div>
        </div>
    );
}

export default AnalyticsLineGraph;