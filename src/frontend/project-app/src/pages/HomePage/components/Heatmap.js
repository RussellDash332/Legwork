import React, { Component} from "react";
import Plot from 'react-plotly.js';




export default function Heatmap() {

    const data = {
        
        "id1": {
                  "9/2022": 111,
                  "10/2022": 134
              },
        "id2": {
                  "9/2022": 97,
                  "10/2022": 123
              },
        "id3": {
                "9/2022": 163,
                "10/2022": 242
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
                    autosize: true, height: 250, legend: {"orientation": "v", y:1}, title: 'HEATMAP HERE', xaxis: {title: 'Date'}, yaxis: {title: 'Count'}, 'modebar': {'orientation': 'v','bgcolor': 'rgba(0,0,0,0.5)'}
                }}
                
                useResizeHandler
                className="w-full h-full"
                config={{ scrollZoom: true,  responsive: true}}
                // displayModeBar: true,
            />
        </div>

    );
}