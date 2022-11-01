import React, { Component, useContext} from "react";
import Plot from 'react-plotly.js';
import CameraDataContext from "./CameraDataContext.js";
import { populateSpotObjsWithCountAnalytics, populatePathObjsWithCountAnalytics } from "../utils/HeatmapUtils.js";





export default function LineGraph2() {

    // const {
    //     filteredData,
    //     setFilteredData,
    //     paths,
    //     spots
    //     } = useContext(CameraDataContext);

    const filteredData = {
        
        "camera_id_1":{
            "left": 
                {
                    "2022": 5,
                    "2023": 10
                },
                "right": 
                {
                    "2022": 5,
                    "2023": 10
                }
        },
                
        "camera_id_2":{
                "left": 
                {
                    "2022": 5,
                    "2023": 10
                },
                "right": 
                {
                    "2022": 5,
                    "2023": 10
                }
        },
        "camera_id_3":{
                "left": 
                {
                    "2022": 5,
                    "2023": 10
                },
                "right": 
                {
                    "2022": 5,
                    "2023": 10
                }
        }
  };


const spots = [{id: "camera_id_3", label: "spot1label", position: "spot1pos"}];
const paths = [{pathName: "path1", id1: "camera_id_1", id2: "camera_id_2"}];
var value1;
var value2;
var valuefinal;

const combinepath = (cam1, cam2) => {
    const cam1data = cam1;
    const cam1data_no_dir = Object.values(cam1data);
    // cam1data_no_dir -> [{2022:5, 2023:10}, {2022:5, 2023:10}]
    const dates1 = Object.keys(cam1data_no_dir[0]);
    const combinedcam1 = {};
    for (let i=0; i < dates1.length; i++) {
  	    value1 = cam1data_no_dir[0][dates1[i]] + cam1data_no_dir[1][dates1[i]];
        combinedcam1[dates1[i]] = value1;
        // combinedcam1 = {2022:10, 2023:20}
    };

    const combinedcam2 = {};
    const cam2data = cam2;
    const cam2data_no_dir = Object.values(cam2data);
    const dates2 = Object.keys(cam2data_no_dir[0]);
    for (let j=0; j < dates2.length; j++) {
        value2 = cam2data_no_dir[0][dates2[j]] + cam2data_no_dir[1][dates2[j]];
        combinedcam2[dates2[j]] = value2;
    };

    const datecombine = Object.keys(combinedcam1);
    const combinedfinal = {};
    for (let k=0; k < datecombine.length; k++) {
        valuefinal = combinedcam1[datecombine[k]] + combinedcam2[datecombine[k]];
        combinedfinal[datecombine[k]] = valuefinal;
        // combinedfinal = {2022:20, 2023:40}                                                         
    };
  
  
    return combinedfinal;
  
};
        //cam1 = eg. filteredData[camid]
        // a = object.values(cam1) -> [{2022:5, 2023:10}, {2022:5, 2023:10}]
        // a[0] = {2022:5, 2023:10}
        // a[1] = {2022:5, 2023:10}
        // dates = object.keys(a[0])
        // combinedcam1 = {}
        // // for (let i = 0; i< dates.length; i++){
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
    



    let checkid = []
    let otherid;
    let combinedfinal;
    let camdataused;
    let dataid = Object.keys(filteredData);
    let datalength = dataid.length;
    const newdata = {};
    // spotids is an array of spot object ids
    const spotids = spots.map((x) => x.id);
    for (let step = 0; step < datalength; step++) {
        // check if dataid[step] has already been processed
        if (!checkid.includes(dataid[step])) {
            let cameradata = filteredData[dataid[step]];
            // check if cam id is a spot
            if (spotids.includes(dataid[step])) {
                camdataused = Object.values(cameradata);
                newdata[dataid[step]] = camdataused[0]
                // camdataused -> { 2022: 5, 2023: 10 } 
            }
            else {
                //loop through path array find if cam id inside the array
                for (let i = 0; i < paths.length; i++) {
                    if (paths[i].id1 === dataid[step] || paths[i].id2 === dataid[step]) {
                        if (paths[i].id1 === dataid[step]){
                            otherid = paths[i].id2;
                        }
                        else {otherid = paths[i].id1}
                        checkid.push(otherid)
                        combinedfinal = combinepath(filteredData[dataid[step]], filteredData[otherid]);
                        newdata[paths[i].pathName] = combinedfinal;
                        // combine data of both id
                        // combinefinal = combinepath(filterData[dataid[step]], filteredData[otherid]) -> return combinedfinal = {2022:20, 2023:40}
                        // newdata[paths[i].pathName] = combinefinal
                    }
                } 
            }
            checkid.push(dataid[step])
        }
        
    };
    
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
                    autosize: true, height: "400", legend: {"orientation": "v", y:1}, title: 'Count vs Date', xaxis: {title: 'Date', categoryorder: 'category ascending'}, yaxis: {title: 'Count'}, 'modebar': {'orientation': 'v','bgcolor': 'rgba(0,0,0,0.5)'}
                }}
                
                useResizeHandler
                className="w-full h-full"
                config={{ scrollZoom: true,  responsive: true}}
                // displayModeBar: true,
            />
        </div>

    );
}