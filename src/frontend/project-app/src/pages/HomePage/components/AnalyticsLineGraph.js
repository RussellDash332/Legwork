import React, { Component} from "react";
import Plot from 'react-plotly.js';

import LineGraph from "./LineGraph";

import LineGraph from "./LineGraph";

const AnalyticsLineGraph = ({filterValue, toggle}) => {
    return (

        <div className="card w-11/12 h-2/5 shadow-xl bg-sky-600">
            
            <div>
            {/* w-full h-full className="p-4" */}
                <LineGraph />
            </div>
            {/* AnalyticsLineGraph */}
            {/* <LineGraph /> */}

        </div>
    );
}

export default AnalyticsLineGraph;