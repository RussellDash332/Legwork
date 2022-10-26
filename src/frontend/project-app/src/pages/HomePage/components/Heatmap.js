import React, { useState, useEffect, useContext } from "react";
import L from "leaflet";
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

const flipYCoordinate = (currY, maxY) => maxY - currY;

const getSpots = (nodes) => {
    let spotsArray = nodes.filter((node) => node.type === "camera");

    spotsArray = spotsArray.map(node => {

        const spotData = {
            id: node.id,
            label: node.data.label,
            position: node.position,               
        };

        return spotData;
    })
    
    return spotsArray;
};

const getPaths = (nodes, edges) => {
    let pathsArray = [];

    for (let i = 0; i < edges.length; i++) {
        const currEdge = edges[i];

        const id1 = currEdge.source;
        const id1Data = nodes.find((node) => node.id === id1);
        const label1 = id1Data.data.label;
        const position1 = id1Data.position;
        const leftDirection = ['cameraTopLeft', 'cameraBottomRight', 'cameraRightUp', 'cameraLeftDown'];
        const direction1 = (leftDirection.includes(id1Data.type)) ? 0 : 1; //0 is left, 1 is right

        const id2 = currEdge.target;
        const id2Data = nodes.find((node) => node.id === id2);
        const label2 = id2Data.data.label;
        const position2 = id2Data.position;
        const direction2 = (leftDirection.includes(id2Data.type)) ? 0 : 1; //0 is left, 1 is right

        const pathName = `[${label1}]-[${label2}]`;
        
        const vertNodes = ['cameraTopRight', 'cameraBottomRight', 'cameraTopLeft', 'cameraBottomLeft'];
        const orientation = (vertNodes.includes(id1Data.type)) ? "vertical" : "horizontal";

        const pathObj = {
            pathName: pathName,
            orientation: orientation,
            id1: id1,
            label1: label1,
            direction1: direction1,
            position1: position1,
            id2: id2,
            label2: label2,
            direction2: direction2,
            position2: position2
        }

        pathsArray = [...pathsArray, pathObj];
    }

    return pathsArray;
};

// Top Right & Bottom Left
const getBoundingBox = (pathObj, scale, maxY) => {
    const shift = (50 * (scale / 50));
    const position1 = pathObj.position1;
    const position2 = pathObj.position2;
    let topRightX;
    let topRightY;
    let bottomLeftX;
    let bottomLeftY;

    // Check if vertical or Horizontal
    if (pathObj.orientation == "vertical") {
        // Check if node1 or node2 is top
        if (position1.y <= position2.y) { // node1 is on top
            topRightX = position1.x + shift;
            topRightY = position1.y;
            bottomLeftX = position2.x;
            bottomLeftY = position2.y + shift;

        } else { // node2 is on top
            topRightX = position2.x + shift;
            topRightY = position2.y;
            bottomLeftX = position1.x;
            bottomLeftY = position1.y + shift;
        }

    } else { // Horizontal
        // Check if node1 or node2 is left
        if (position1.x <= position2.x) { // node1 is left
            topRightX = position2.x + shift;
            topRightY = position2.y;
            bottomLeftX = position1.x;
            bottomLeftY = position1.y + shift;

        } else { // node2 is on left
            topRightX = position1.x + shift;
            topRightY = position1.y;
            bottomLeftX = position2.x;
            bottomLeftY = position2.y + shift;
        }
    }
    return [[flipYCoordinate(bottomLeftY, maxY), bottomLeftX], 
            [flipYCoordinate(topRightY, maxY), topRightX]];
}

const getTotalCount = (pathObjs, spotObjs) => (
    (pathObjs.reduce((acc, currPathObj) => acc + currPathObj.count, 0)) +
    (spotObjs.reduce((acc, currPathObj) => acc + currPathObj.count, 0))
);

const Heatmap = ({ liveCount }) => {
    const { user } = useContext(UserContext);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [floorplanImage, setFloorplanImage] = useState([]);
    const [scale, setScale] = useState(50);
   
    const img = new Image();
    img.src = floorplanImage ? Floorplan : floorplanImage[0].data_url;

    const bounds = [[0, 0], [img.naturalHeight, img.naturalWidth]];
    const center = [img.naturalHeight / 2, img.naturalWidth / 2];
    const liveCountz = getTotalCount(samplePathObjs, sampleSpotObjs);

    useEffect(() => {
        // Retrieve exisitng flow component state
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

    const renderPaths = () => {
        const paths = getPaths(nodes, edges);
        return (
            paths.map((data) => (
                <FeatureGroup pathOptions={{ color: getColor(data.count, liveCountz) }}>
                    <Rectangle bounds={getBoundingBox(data, scale, img.naturalHeight)} fill fillOpacity={0.8}>
                        <Tooltip>
                            {`Path: ${data.pathName}`} <br/>
                            {`Live Count: ${data.count}`}
                        </Tooltip>
                    </Rectangle>
                </FeatureGroup>
        )));
    };

    const renderSpots = () => {
        const spots = getSpots(nodes);
        return (
            spots.map((data) => (
            <FeatureGroup pathOptions={{ color: getColor(data.count, liveCountz) }}>
                <Circle center={[flipYCoordinate(data.position.y, img.naturalHeight), data.position.x]} radius={20} fill fillOpacity={0.8}>
                    <Tooltip>
                        {`Spot: ${data.label}`} <br/>
                        {`Live Count: ${data.count}`}
                    </Tooltip>
                </Circle>
            </FeatureGroup>
        )));
    };

    const renderFloorPlan = () => (
        <LayersControl.BaseLayer checked name="Floorplan">
            <LayerGroup>
                {/* <div style={{ width: '400px' }}> */}
                <ImageOverlay 
                    // className="object-fit"
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