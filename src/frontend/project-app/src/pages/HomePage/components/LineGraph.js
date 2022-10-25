import React, { Component} from "react";
import Plot from 'react-plotly.js';
import Papa from 'papaparse';


export default function LineGraph() {
    const trace = {
        x: ['1/01/22','2/01/22','3/01/22', '4/01/22', '5/01/22','6/01/22','7/01/22', '8/01/22', '9/01/22','10/01/22','11/01/22', '12/01/22'],
        y: [200,140,312,222,132,321,231,111,67,99, 111, 278],
        type: 'scatter',
        mode: 'lines+markers',
        name: "path 1",
    };

    const trace2 = {
        x: ['1/01/22','2/01/22','3/01/22', '4/01/22', '5/01/22','6/01/22','7/01/22', '8/01/22', '9/01/22','10/01/22','11/01/22', '12/01/22'],
        y: [134,322,356,121,211,421,111,92,333,291,78,100],
        type: 'scatter',
        mode: 'lines+markers',
        name: "path 2",
    };

    const trace3 = {
        x: ['1/01/22','2/01/22','3/01/22', '4/01/22', '5/01/22','6/01/22','7/01/22', '8/01/22', '9/01/22','10/01/22','11/01/22', '12/01/22'],
        y: [43,55,63,78,72,70,33,32,83,50,43,12],
        type: 'scatter',
        mode: 'lines+markers',
        name: "spot 1",
    };

    const data = [trace, trace2, trace3];
    return (
        <div>
            <Plot
                data = {data}
                layout={{
                    autosize: true, height: 370, legend: {"orientation": "h", y:2}, title: 'Count vs Date', xaxis: {title: 'Date'}, yaxis: {title: 'Count'}, 'modebar': {'orientation': 'v','bgcolor': 'rgba(0,0,0,0.5)'}
                }}
                
                useResizeHandler
                className="w-full h-full"
                config={{ scrollZoom: true, displayModeBar: true, responsive: true}}
                
            />
        </div>

    );
}



