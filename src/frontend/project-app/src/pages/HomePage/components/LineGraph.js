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
            "2022/11/21": 30,
            "2022/12/30": 51,
            
        },
        "id2": 
        {
            "2022/11/21": 41,
            "2022/12/30": 57,
            
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
                    autosize: true, height: "450", legend: {"orientation": "v", y:1}, title: 'Count vs Date', xaxis: {title: 'Date'}, yaxis: {title: 'Count'}, 'modebar': {'orientation': 'v','bgcolor': 'rgba(0,0,0,0.5)'}
                }}
                
                useResizeHandler
                className="w-full h-full"
                config={{ scrollZoom: true,  responsive: true}}
                // displayModeBar: true,
            />
        </div>

    );
}