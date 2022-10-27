import React, { Component} from "react";
import Plot from 'react-plotly.js';

import LineGraph from "./LineGraph";


const AnalyticsLineGraph = () => {
    return (
        <div className="card w-11/12 h-45 shadow-xl bg-sky-600">
            
            <div>
            {/* w-full h-full className="p-4" */}
                <LineGraph />
                {/* <Draftlinechart /> */}
            </div>
        
            
            
        </div>
    );
}

export default AnalyticsLineGraph;