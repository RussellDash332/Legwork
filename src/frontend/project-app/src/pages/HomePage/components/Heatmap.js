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
    "1234": {
        "2021": 30000,
        "2022": 5100
    },
    "2345": {
        "2021": 6200,
        "2022": 3400
    },
    "24344": {
        "2021": 5900,
        "2022": 1300
    },
    "34435": {
        "2021": 3400,
        "2022": 6900
    },
    "214234234": {
        "2021": 4700,
        "2022": 2300
    },
    "433434": {
        "2021": 7100,
        "2022": 1200
    },
    "35534634": {
        "2021": 3200,
        "2022": 3100
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

    const leafletHeight = (img.naturalHeight/img.naturalWidth) * 800;
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

    const renderPaths = () => (
        pathsWithCounts.map((data) => (
            <FeatureGroup pathOptions={{ color: getColor(data.count, liveCount) }}>
                <Rectangle bounds={getBoundingBox(data, scale, leafletHeight)} fill fillOpacity={0.8}>
                    <Tooltip>
                        {`Path: ${data.pathName}`} <br/>
                        {`Live Count: ${data.count}`}
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
                    {`Live Count: ${data.count}`}
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