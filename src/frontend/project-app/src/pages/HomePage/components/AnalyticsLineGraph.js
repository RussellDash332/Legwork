import React, { Component} from "react";
import Plot from 'react-plotly.js';

import LineGraph from "./LineGraph";


const AnalyticsLineGraph = () => {
    return (
        <div className="card w-10/12 h-full shadow-xl bg-base-200">
            
            <div>
            {/* w-full h-full className="p-4" */}
                <LineGraph />
                {/* <Draftlinechart /> */}
            </div>
        
            
            
        </div>
    );
}

export default AnalyticsLineGraph;