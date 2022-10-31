import React, { Component, useContext} from "react";
import Plot from 'react-plotly.js';
import CameraDataContext from "./CameraDataContext.js";
import { populateSpotObjsWithCountAnalytics, populatePathObjsWithCountAnalytics } from "../utils/HeatmapUtils.js";





export default function LineGraph() {

    const {
        filteredData,
        setFilteredData,
        paths,
        spots
        } = useContext(CameraDataContext);

    const data = {
        
        "id1": 
        {
            "10/10/2022": 30,
            "10/15/2022": 51,
            "10/16/2022": 89,
            "10/18/2022": 101,
            "10/28/2022": 91
        },
        "id2": 
        {
            "10/10/2022": 41,
            "10/15/2022": 57,
            "10/16/2022": 78,
            "10/18/2022": 121,
            "10/28/2022": 67
        }
    };





    const generateTraces = () => {
        var traces = [];
        let lines = Object.keys(data);
        const innerValues = Object.values(data);
        let len = lines.length;
        for (let step = 0; step < len; step++) {
            let lineid = lines[step];
            let x_axis = Object.keys(innerValues[step]);
            let y_axis = Object.values(innerValues[step]);
            const trace = {
                x: x_axis,
                y: y_axis,
                type: 'scatter',
                mode: 'lines+markers',
                name: lineid,
            };
            traces.push(trace);

        };

        return traces;

    };

    console.log(generateTraces);



    return (
        <div>
            <Plot
                data = {generateTraces()}
                layout={{
                    autosize: true, height: "400", legend: {"orientation": "v", y:1}, title: 'Count vs Date', xaxis: {title: 'Date'}, yaxis: {title: 'Count'}, 'modebar': {'orientation': 'v','bgcolor': 'rgba(0,0,0,0.5)'}
                }}
                
                useResizeHandler
                className="w-full h-full"
                config={{ scrollZoom: true,  responsive: true}}
                // displayModeBar: true,
            />
        </div>

    );
}