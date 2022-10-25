import React, { Component} from "react";
import Plot from 'react-plotly.js';

import LineGraph from "./LineGraph";

const AnalyticsLineGraph = ({filterValue, toggle}) => {
    return (
<<<<<<< HEAD
        <div className="card w-2/3 h-2/5 shadow-xl bg-orange-400">
            AnalyticsLineGraph
            toggled by: {toggle}
=======
        <div className="card w-11/12 h-2/5 shadow-xl bg-sky-600">
            
            <div>
            {/* w-full h-full className="p-4" */}
                <LineGraph />
            </div>
            {/* AnalyticsLineGraph */}
            {/* <LineGraph /> */}
            
            
>>>>>>> frontend
        </div>
    );
}

export default AnalyticsLineGraph;