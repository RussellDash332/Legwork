import React, { Component, useContext} from "react";
import Plot from 'react-plotly.js';
import CameraDataContext from "./CameraDataContext.js";
import { populateSpotObjsWithCountAnalytics, populatePathObjsWithCountAnalytics } from "../utils/HeatmapUtils.js";





export default function LineGraph2() {

    const {
        filteredData,
        setFilteredData,
        paths,
        spots
        } = useContext(CameraDataContext);

    
    const combinepath = (cam1, cam2) => {
        //cam1 = eg. filteredData[camid]
        // a = object.values(cam1) -> [{2022:5, 2023:10}, {2022:5, 2023:10}]
        // a[0] = {2022:5, 2023:10}
        // a[1] = {2022:5, 2023:10}
        // dates = object.keys(a[0])
        // combinedcam1 = {}
        // // for (let i = 0; i< dates.lenght; i++){
        //     value = a[0][dates[i]] + a[1][dates[i]]
        //     combinedcam1[dates[i]] = value
        // }
        // combinedcam1 = {2022:10, 2023:20}

        // combinedcam2 = {}
        // // for (let i = 0; i< dates.lenght; i++){
        //     value = a[0][dates[i]] + a[1][dates[i]]
        //     combinedcam1[dates[i]] = value
        // }
        // combinedcam2 = {2022:10, 2023:20}

        // combine combinedcam1 and combinedcam2
        // date = object.keys(combinedcam1)
        // combinedfinal = {}
        // // for (let i = 0; i< dates.lenght; i++){
        //     value = a[0][dates[i]] + a[1][dates[i]]
        //     combinedcam1[dates[i]] = value
        // }
        // combinedfinal = {2022:20, 2023:40}
        // return combinedfinal
    }



    let checkid = []
    let dataid = Object.keys(filteredData);
    let datalength = dataid.length
    const newdata = {}
    // spotids is an array of spot object ids
    const spotids = spots.map((x) => x.id);
    for (let step = 0; step < datalength; step++) {
        // check if dataid[step] has already been processed
        if (!checkid.includes(dataid[step])) {
            let cameradata = filteredData[dataid[step]];
            // check if camid is a spot
            if (spotids.includes(dataid[step])) {
                newdata[dataid[step]] = cameradata
            }
            else {
                //loop through path array find if camid inside the array
                for (let i = 0; i < paths.length; i++) {
                    if (paths[i].id1 === dataid[step] || paths[i].id2 === dataid[step]) {
                        if (paths[i].id1 === dataid[step]){
                            otherid = paths[i].id2
                        }
                        else {otherid = paths[i].id1}
                        checkid.push(otherid)
                        // combine data of both id
                        // combinefinal = combinepath(filterData[dataid[step]], filteredData[otherid]) -> return combinedfinal = {2022:20, 2023:40}
                        // newdata[paths[i].pathName] = combinefinal
                    }
                } 
            }
            checkid.push(dataid[step])
        }
        
    }
    
    // spots is id, paths is pathname
    // newdata = {
    //     "id1": 
    //     {
    //         "2022": 20,
    //         "2023": 40
    //     },
    //     "path1":
    //     {
    //         "2022": 20,
    //         "2023": 40
    //     }
    // }

    




    const generateTraces = () => {
        var traces = [];
        let lines = Object.keys(newdata);
        const innerValues = Object.values(newdata);
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