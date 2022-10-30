<<<<<<< HEAD
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
                    autosize: true, height: "40vh", legend: {"orientation": "v", y:1}, title: 'HEATMAP HERE', xaxis: {title: 'Date'}, yaxis: {title: 'Count'}, 'modebar': {'orientation': 'v','bgcolor': 'rgba(0,0,0,0.5)'}
                }}
                
                useResizeHandler
                className="w-full h-full"
                config={{ scrollZoom: true,  responsive: true}}
                // displayModeBar: true,
            />
        </div>

    );
}
=======
import React, { useState, useEffect, useContext } from "react";
import L, { imageOverlay } from "leaflet";
import { MapContainer, ImageOverlay, LayersControl, LayerGroup, 
         FeatureGroup, Tooltip, Rectangle, Circle } from "react-leaflet";
// import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
// import dataPoints from "../../../data/Heatmap";
import { getFloorplanImage } from "../../../api/firebase-storage";
import { getNodeScale, getUserNodes } from "../../../api/firebase-db";
import { hoverData, getColor } from "../../../data/HoverFloorplan";
import { UserContext } from "../../ProtectedRoute";
import Gridimage from "../../../assets/images/Gridlines.jpeg";
import Floorplan from "../../../assets/images/Floorplan.png";
import { 
    Mode,
    getSpots,
    getPaths,
    populateSpotObjsWithCountLive,
    populateSpotObjsWithCountAnalytics,
    populatePathObjsWithCountLive,
    populatePathObjsWithCountAnalytics,
    getBoundingBox,
    getAdjustedSpotCenter
} from "../utils/HeatmapUtils"

const samplePathObjs = [
{
    pathName: "path-1",
    orientation: "vertical",
    id1: "1",
    label1: "cam 1",
    direction1: 0, // Left 
    position1: {
        x: 10,
        y: 20
    },
    id2: "2",
    label2: "cam 2",
    direction2: 1, // Right
    position2: {
        x: 10,
        y: 40
    },
},
{
    pathName: "path-2",
    orientation: "vertical",
    id1: "3",
    label1: "cam 3",
    direction1: 0, // Left 
    position1: {
        x: 100,
        y: 20
    },
    id2: "4",
    label2: "cam 4",
    direction2: 1, // Right
    position2: {
        x: 100,
        y: 40
    },
},
{
    pathName: "path-3",
    orientation: "vertical",
    id1: "5",
    label1: "cam 5",
    direction1: 0, // Left 
    position1: {
        x: 190,
        y: 20
    },
    id2: "6",
    label2: "cam 6",
    direction2: 1, // Right
    position2: {
        x: 190,
        y: 40
    },
},
];

const sampleAnalyticsData = {
    "1": {
        "2021": 30000,
        "2022": 51000
    },
    "2": {
        "2021": 5000,
        "2022": 3400
    },
    "3": {
        "2021": 5900,
        "2022": 1300
    },
    "4": {
        "2021": 7900,
        "2022": 6900
    },
    "5": {
        "2021": 4700,
        "2022": 2300
    },
    "6": {
        "2021": 71000,
        "2022": 1200
    },
    "7": {
        "2021": 3200,
        "2022": 310
    },
    "8": {
        "2021": 3235,
        "2022": 90
    },
    "9": {
        "2021": 7800,
        "2022": 4200
    },
    "10": {
        "2021": 100,
        "2022": 300
    },
    "11": {
        "2021": 6800,
        "2022": 2400
    },
    "12": {
        "2021": 7900,
        "2022": 1000
    },
    "13": {
        "2021": 5400,
        "2022": 5348
    },
    "14": {
        "2021": 9846,
        "2022": 9475
    },
    "15": {
        "2021":14568,
        "2022": 14736
    },
    "16": {
        "2021": 12800,
        "2022": 13100
    },
    "17": {
        "2021": 15600,
        "2022": 12100
    },
    "18": {
        "2021": 4570,
        "2022": 8574
    },
    "19": {
        "2021": 3200,
        "2022": 2304
    },
    "20": {
        "2021": 3400,
        "2022": 4200
    },
    "21": {
        "2021": 4509,
        "2022": 4588
    },
    "22": {
        "2021": 22000,
        "2022": 2300
    },
    "23": {
        "2021": 45000,
        "2022": 1300
    },
    "24": {
        "2021": 7500,
        "2022": 6500
    },
    "25": {
        "2021": 5670,
        "2022": 5300
    },
    "26": {
        "2021": 3900,
        "2022": 3100
    },
    "27": {
        "2021": 8700,
        "2022": 7270
    },
    "28": {
        "2021": 100,
        "2022": 200
    },
    "29": {
        "2021": 2900,
        "2022": 3200
    },
    "30": {
        "2021": 8440,
        "2022": 3400
    },
    "31": {
        "2021": 2900,
        "2022": 3200
    },
    "32": {
        "2021": 2900,
        "2022": 3200
    },
    "33": {
        "2021": 2900,
        "2022": 3200
    },
    "34": {
        "2021": 2900,
        "2022": 3200
    },
    "35": {
        "2021": 29000,
        "2022": 3200
    }
};

const sampleSpotObjs = [
{
    spotName: "spot-1",
    id: "1",
    label: "cam 7",
    position: {
        x: 200,
        y: 200
    },
}
];

const Heatmap = ({ mode }) => {
    const { user } = useContext(UserContext);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [floorplanImage, setFloorplanImage] = useState([]);
    const [scale, setScale] = useState(50);

    const filterMode = "year";

    const img = new Image();
    img.src = floorplanImage ? Floorplan : floorplanImage[0].data_url;

    console.log('width', img.naturalWidth);
    console.log('height', img.naturalHeight);

    //const leafletHeight = (img.naturalHeight/img.naturalWidth) * 800;
    const leafletHeight = (602/1033) * 800;
    const bounds = [[0, 0], [leafletHeight, 800]];
    const center = [leafletHeight / 2, 800 / 2];

    // Get paths
    const paths = getPaths(nodes, edges);
    let pathsWithCounts;
    if (mode === Mode.Live) {
        pathsWithCounts = populatePathObjsWithCountLive(paths);
    } else { // Analytics
        pathsWithCounts = populatePathObjsWithCountAnalytics(paths, sampleAnalyticsData, filterMode);
    }

    // Get spots
    const spots = getSpots(nodes);
    let spotsWithCounts;
    if (mode === Mode.Live) {
        spotsWithCounts = populateSpotObjsWithCountLive(spots);
    } else { // Analytics
        spotsWithCounts = populateSpotObjsWithCountAnalytics(spots, sampleAnalyticsData, filterMode);
    }

    // Set live count
    const liveCount = 
        (pathsWithCounts.reduce((acc, currPathObj) => acc + currPathObj.count, 0)) +
        (spotsWithCounts.reduce((acc, currPathObj) => acc + currPathObj.count, 0));

    useEffect(() => {
        // Retrieve existing flow component state
        getUserNodes(user.uid,
            (nodeData) => {
                if (nodeData) {
                    if (nodeData.nodes) {
                        const nodes = nodeData.nodes;
                        setNodes(nodes);
                    }
        
                    if (nodeData.edges) {
                        const edges = nodeData.edges;
                        setEdges(edges);
                    }
                }
            });

        // Retrieve existing image
        getFloorplanImage(user.uid,
            (img_data) => {
                if (img_data.hasOwnProperty('data_url')) {
                    const currentData = [img_data];
                    setFloorplanImage(currentData);
                }
            });

        // Retrieve node scaling
        getNodeScale(user.uid,
            (nodeScale) => {
                setScale(nodeScale);
            });
    }, []);

    console.log("Live Count: " + liveCount)

    const renderPaths = () => (
        pathsWithCounts.map((data) => (
            <FeatureGroup pathOptions={{ color: getColor(data.count, liveCount) }}>
                <Rectangle bounds={getBoundingBox(data, scale, leafletHeight)} fill fillOpacity={0.8}>
                    <Tooltip>
                        {`Path: ${data.pathName}`} <br/>
                        {`Count: ${data.count}`}
                    </Tooltip>
                </Rectangle>
            </FeatureGroup>
    )));

    const renderSpots = () => (
        spotsWithCounts.map((data) => (
        <FeatureGroup pathOptions={{ color: getColor(data.count, liveCount) }}>
            <Circle center={getAdjustedSpotCenter(data, scale, leafletHeight)} radius={30 * scale/100} fill fillOpacity={0.8}>
                <Tooltip>
                    {`Spot: ${data.label}`} <br/>
                    {`Count: ${data.count}`}
                </Tooltip>
            </Circle>
        </FeatureGroup>
    )));

    const renderFloorPlan = () => (
        <LayersControl.BaseLayer checked name="Floorplan">
            <LayerGroup>
                {/* <div className="w-[800px]"> */}
                <ImageOverlay 
                    // className="object-contain"
                    attribution="&copy; Developed by LegWork Inc." 
                    url={img.src} 
                    bounds={bounds} 
                />
                {renderPaths()}
                {renderSpots()}
                {/* </div> */}
            </LayerGroup>
        </LayersControl.BaseLayer>
    );

    const renderGridlines = () => (
        <LayersControl.BaseLayer name="Gridlines">
            <LayerGroup>
                <ImageOverlay 
                    attribution="&copy; Developed by LegWork Inc." 
                    url={Gridimage} 
                    bounds={bounds} 
                />
                {renderPaths()}
                {renderSpots()}
            </LayerGroup>
        </LayersControl.BaseLayer>
    );

    return (
        <MapContainer 
            center={center} 
            zoom={0} 
            scrollWheelZoom
            style={{ height: '85vh', width: '100%' }}
            crs={L.CRS.Simple}
        >
            {/* <HeatmapLayer
                points={dataPoints}
                fitBoundsOnLoad
                fitBoundsOnUpdate
                radius={20}
                latitudeExtractor={(m) => m.coordinates[0]}
                longitudeExtractor={(m) => m.coordinates[1]}
                intensityExtractor={(m) => m.intensity}
            /> */}
            <LayersControl position="topright">
                {renderFloorPlan()}
                {renderGridlines()}
            </LayersControl>
        </MapContainer>
    );
};

export default Heatmap;
>>>>>>> frontend
