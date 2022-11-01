import React from "react";
import Plot from 'react-plotly.js';
import LineGraph from "./LineGraph"
import LineGraph2 from "./LineGraph2";

const AnalyticsLineGraph = () => {
    return (
        <div className="card w-10/12 h-full shadow-xl bg-base-200">
            
            <div>
                {/* <LineGraph /> */}
                <LineGraph2 />
                
            </div>
        </div>
    );
}

export default AnalyticsLineGraph;