import React, { useContext, useState, useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, ImageOverlay, LayersControl, LayerGroup, 
         FeatureGroup, Tooltip, Rectangle, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getBounds } from "leaflet";
import { hoverData, getColor } from "../../../data/HoverFloorplan";
import Gridimage from "../../../assets/images/Gridlines.jpeg";
import Floorplan from "../../../assets/images/Floorplan.png";
import CameraDataContext from "./CameraDataContext.js";
import { 
    Mode,
    populateSpotObjsWithCountLive,
    populateSpotObjsWithCountAnalytics,
    populatePathObjsWithCountLive,
    populatePathObjsWithCountAnalytics,
    getBoundingBox,
    getAdjustedSpotCenter,
    getSpotCenter,
    getOriginalBoundingBox
} from "../utils/HeatmapUtils"
import { set } from "date-fns";

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
        "2021": 1500,
        "2022": 510
    },
    "2": {
        "2021": 3400,
        "2022": 2100
    },
    "3": {
        "2021": 5900,
        "2022": 1300
    },
    "4": {
        "2021": 54,
        "2022": 21
    },
    "5": {
        "2021": 1000,
        "2022": 250
    },
    "6": {
        "2021": 71000,
        "2022": 12000
    },
    "7": {
        "2021": 3200,
        "2022": 310
    },
    "8": {
        "2021": 323,
        "2022": 900
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
        "2021": 680,
        "2022": 240
    },
    "12": {
        "2021": 7900,
        "2022": 100
    },
    "13": {
        "2021": 540,
        "2022": 534
    },
    "14": {
        "2021": 984,
        "2022": 947
    },
    "15": {
        "2021":1456,
        "2022": 1473
    },
    "16": {
        "2021": 1280,
        "2022": 1310
    },
    "17": {
        "2021": 1560,
        "2022": 1210
    },
    "18": {
        "2021": 4570,
        "2022": 857
    },
    "19": {
        "2021": 3200,
        "2022": 230
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
        "2021": 2200,
        "2022": 2300
    },
    "23": {
        "2021": 4500,
        "2022": 1300
    },
    "24": {
        "2021": 750,
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
        "2021": 87,
        "2022": 7270
    },
    "28": {
        "2021": 100,
        "2022": 200
    },
    "29": {
        "2021": 290,
        "2022": 3200
    },
    "30": {
        "2021": 84,
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
        "2022": 320
    },
    "34": {
        "2021": 2900,
        "2022": 320
    },
    "35": {
        "2021": 2900,
        "2022": 3200
    }
};

const newSampleData = {
    "1" :{
        "left": {
            "2021" : 1500,
            "2022" : 510
        },
        "right": {
            "2021" : 1500,
            "2022" : 510
        }        
    },
    "2" :{
        "left": {
            "2021" : 3400,
            "2022" : 2100
        },
        "right": {
            "2021" : 3400,
            "2022" : 2100
        }        
    },
    "3" :{
        "left": {
            "2021" : 5900,
            "2022" : 1300
        },
        "right": {
            "2021" : 5900,
            "2022" : 1300
        }        
    },
    "4" :{
        "left": {
            "2021" : 54,
            "2022" : 21
        },
        "right": {
            "2021" : 54,
            "2022" : 21
        }        
    },
    "5" :{
        "left": {
            "2021" : 1000,
            "2022" : 250
        },
        "right": {
            "2021" : 1000,
            "2022" : 250
        }        
    },
    "6" :{
        "left": {
            "2021" : 71000,
            "2022" : 12000
        },
        "right": {
            "2021" : 71000,
            "2022" : 12000
        }        
    },
    "7" :{
        "left": {
            "2021" : 3200,
            "2022" : 310
        },
        "right": {
            "2021" : 3200,
            "2022" : 310
        }        
    },
    "8" :{
        "left": {
            "2021" : 323,
            "2022" : 900
        },
        "right": {
            "2021" : 323,
            "2022" : 900
        }        
    },
    "9" :{
        "left": {
            "2021" : 7800,
            "2022" : 4200
        },
        "right": {
            "2021" : 7800,
            "2022" : 4200
        }        
    },
    "10" :{
        "left": {
            "2021" : 100,
            "2022" : 300
        },
        "right": {
            "2021" : 100,
            "2022" : 300
        }        
    },
    "11" :{
        "left": {
            "2021" : 680,
            "2022" : 240
        },
        "right": {
            "2021" : 680,
            "2022" : 240
        }        
    },
    "12" :{
        "left": {
            "2021" : 7900,
            "2022" : 100
        },
        "right": {
            "2021" : 7900,
            "2022" : 100
        }        
    },
    "13" :{
        "left": {
            "2021" : 540,
            "2022" : 534
        },
        "right": {
            "2021" : 540,
            "2022" : 534
        }        
    },
    "14" :{
        "left": {
            "2021" : 984,
            "2022" : 947
        },
        "right": {
            "2021" : 984,
            "2022" : 947
        }        
    },
    "15" :{
        "left": {
            "2021" : 1456,
            "2022" : 1473
        },
        "right": {
            "2021" : 1456,
            "2022" : 1473
        }        
    },
    "16" :{
        "left": {
            "2021" : 1280,
            "2022" : 1310
        },
        "right": {
            "2021" : 1280,
            "2022" : 1310
        }        
    },
    "17" :{
        "left": {
            "2021" : 1560,
            "2022" : 1210
        },
        "right": {
            "2021" : 1560,
            "2022" : 1210
        }        
    },
    "18" :{
        "left": {
            "2021" : 4570,
            "2022" : 857
        },
        "right": {
            "2021" : 4570,
            "2022" : 857
        }        
    },
    "19" :{
        "left": {
            "2021" : 3200,
            "2022" : 230
        },
        "right": {
            "2021" : 3200,
            "2022" : 230
        }        
    },
    "20" :{
        "left": {
            "2021" : 3400,
            "2022" : 4200
        },
        "right": {
            "2021" : 3400,
            "2022" : 4200
        }        
    },
    "21" :{
        "left": {
            "2021" : 4509,
            "2022" : 4588
        },
        "right": {
            "2021" : 4509,
            "2022" : 4588
        }        
    },
    "22" :{
        "left": {
            "2021" : 2200,
            "2022" : 2300
        },
        "right": {
            "2021" : 2200,
            "2022" : 2300
        }        
    },
    "23" :{
        "left": {
            "2021" : 4500,
            "2022" : 1300
        },
        "right": {
            "2021" : 4500,
            "2022" : 1300
        }        
    },
    "24" :{
        "left": {
            "2021" : 750,
            "2022" : 6500
        },
        "right": {
            "2021" : 750,
            "2022" : 6500
        }        
    },
    "25" :{
        "left": {
            "2021" : 5670,
            "2022" : 5300
        },
        "right": {
            "2021" : 5670,
            "2022" : 5300
        }        
    },
    "26" :{
        "left": {
            "2021" : 3900,
            "2022" : 3100
        },
        "right": {
            "2021" : 3900,
            "2022" : 3100
        }        
    },
    "27" :{
        "left": {
            "2021" : 87,
            "2022" : 7270
        },
        "right": {
            "2021" : 87,
            "2022" : 7270
        }        
    },
    "28" :{
        "left": {
            "2021" : 100,
            "2022" : 200
        },
        "right": {
            "2021" : 100,
            "2022" : 200
        }        
    },
    "29" :{
        "left": {
            "2021" : 290,
            "2022" : 3200
        },
        "right": {
            "2021" : 290,
            "2022" : 3200
        }        
    },
    "30" :{
        "left": {
            "2021" : 84,
            "2022" : 3400
        },
        "right": {
            "2021" : 84,
            "2022" : 3400
        }        
    },
    "31" :{
        "left": {
            "2021" : 2900,
            "2022" : 3200
        },
        "right": {
            "2021" : 2900,
            "2022" : 3200
        }        
    },
    "32" :{
        "left": {
            "2021" : 2900,
            "2022" : 3200
        },
        "right": {
            "2021" : 2900,
            "2022" : 3200
        }        
    },
    "33" :{
        "left": {
            "2021" : 2900,
            "2022" : 320
        },
        "right": {
            "2021" : 2900,
            "2022" : 320
        }        
    },
    "34" :{
        "left": {
            "2021" : 2900,
            "2022" : 320
        },
        "right": {
            "2021" : 2900,
            "2022" : 320
        }        
    },
    "35" :{
        "left": {
            "2021" : 2900,
            "2022" : 3200
        },
        "right": {
            "2021" : 2900,
            "2022" : 3200
        }        
    }
};


const sampleSpotObjs = [
{
    spotName: "spot-1",
    id: "123",
    label: "cam 7",
    position: {
        x: 200,
        y: 200
    },
    spotName: "spot-2",
    id: "123",
    label: "cam 7",
    position: {
        x: 200,
        y: 200
    }
}
];

const Heatmap = ({ mode }) => {
    const {
        paths, spots, floorplanImage, scale, filteredData, filterGroupToggle, data
    } = useContext(CameraDataContext);
    const filterMode = filterGroupToggle;
    const attribution = "&copy; Developed by LegWork Inc." ;
    const [imgSrc, setImgSrc] = useState(Floorplan);
    const [leafletHeight, setLeafletHeight] = useState((602/1033) * 800);
    const [bounds, setBounds] = useState([[0, 0], [(602/1033) * 800, 800]]);
    const [center, setCenter] = useState([((602/1033) * 800) / 2, 800 / 2]);
    const mapRef = useRef();
    const floorplanLayerRef = useRef();
    const gridlinesLayerRef = useRef();

    // console.log("src", imgSrc);
    // console.log("leafletHeight", leafletHeight);
    // console.log("bounds", bounds);
    // console.log("center", center);
    console.log("String filtered data", filteredData);

    const loadImage = (setLeafletHeight, setBounds, setCenter, setImgSrc, src) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            const modifier = 400;
            const height = (img.naturalHeight/img.naturalWidth) * modifier

            const bounds = [[0, 0], [height, modifier]];
            const center = [height / 2, modifier / 2];
            setImgSrc(src);
            setLeafletHeight(height);
            setBounds(bounds);
            setCenter(center);

            const map = mapRef.current;
            const floorplanLayer = floorplanLayerRef.current;
            const gridlinesLayer = gridlinesLayerRef.current;

            const floorplanImage = L.imageOverlay(src, bounds, { attribution }).addTo(floorplanLayer);
            const gridImage = L.imageOverlay(Gridimage, bounds, { attribution }).addTo(gridlinesLayer);
            map.fitBounds(floorplanImage.getBounds());
        }
    }

    useEffect(() => {
        if (floorplanImage && floorplanImage[0])
        loadImage(setLeafletHeight, setBounds, setCenter, setImgSrc, floorplanImage[0].data_url);
    }, [floorplanImage]);

    // Get paths
    const [pathsWithCounts, setPathsWithCounts] = useState([]);
    useEffect(() => {
        if (mode === Mode.Live) {
            setPathsWithCounts(populatePathObjsWithCountLive(paths, data));
        } else { // Analytics
            setPathsWithCounts(populatePathObjsWithCountAnalytics(paths, filteredData, filterMode));
        }
    }, [data, filteredData, paths])
    

    // Get spots
    const [spotsWithCounts, setSpotsWithCounts] = useState([]);
    useEffect(() => {
        if (mode === Mode.Live) {
            setSpotsWithCounts(populateSpotObjsWithCountLive(spots, data));
        } else { // Analytics
            setSpotsWithCounts(populateSpotObjsWithCountAnalytics(spots, filteredData, filterMode));
        }
    }, [data, filteredData, spots])

    // Set live count
    const liveCount = 
        (pathsWithCounts.reduce((acc, currPathObj) => acc + currPathObj.count, 0)) +
        (spotsWithCounts.reduce((acc, currPathObj) => acc + currPathObj.count, 0));


    useEffect(() => {
        if (spotsWithCounts.length !== 0 || pathsWithCounts !== 0) {
            if (floorplanImage && floorplanImage[0]) {
                setCenter(
                    getEmptyBounds(pathsWithCounts.map(x => {
                        return getBoundingBox(x, scale, leafletHeight, floorplanImage[0].data_url)
                     }), spotsWithCounts.map(x => {
                         return getAdjustedSpotCenter(x, scale, leafletHeight, floorplanImage[0].data_url)
     
                     }))
                )
            } else {
                setCenter(
                    getEmptyBounds(
                        pathsWithCounts.map(x => {
                            return getOriginalBoundingBox(x, scale)
                        }),
                        spotsWithCounts.map(x => { 
                            return getSpotCenter(x, scale)
                        })
                    )
                )
            }
            
        }
    }, [spotsWithCounts, pathsWithCounts])

    const renderPaths = () => (
        pathsWithCounts.map((data) => (
            <FeatureGroup pathOptions={{ color: getColor(data.count, liveCount) }}>
                <Rectangle bounds={
                    (floorplanImage && floorplanImage[0]) 
                    ? getBoundingBox(data, scale, leafletHeight, floorplanImage[0].data_url)
                    : getOriginalBoundingBox(data, scale)
                    } 
                fill fillOpacity={0.8}>
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
            <Circle center={
                (floorplanImage && floorplanImage[0]) 
                    ? getAdjustedSpotCenter(data, scale, leafletHeight, floorplanImage[0].data_url)
                    : getSpotCenter(data, scale)
            } 
            radius={30 * scale/100} fill fillOpacity={0.8}>
                <Tooltip>
                    {`Spot: ${data.label}`} <br/>
                    {`Count: ${data.count}`}
                </Tooltip>
            </Circle>
        </FeatureGroup>
    )));

    const renderFloorPlan = () => (
        <LayersControl.BaseLayer checked name="Floorplan">
            <LayerGroup ref={floorplanLayerRef}>
                {/* <ImageOverlay 
                    attribution={attribution}
                    url={imgSrc}
                    errorOverlayUrl={Floorplan} 
                    bounds={bounds} 
                /> */}
                {renderPaths()}
                {renderSpots()}
            </LayerGroup>
        </LayersControl.BaseLayer>
    );

    const renderGridlines = () => (
        <LayersControl.BaseLayer name="Gridlines">
            <LayerGroup ref={gridlinesLayerRef}>
                {/* <ImageOverlay 
                    attribution={attribution}
                    url={Gridimage} 
                    bounds={[[0, 0], [(602/1033) * 800, 800]]} 
                /> */}
                {renderPaths()}
                {renderSpots()}
            </LayerGroup>
        </LayersControl.BaseLayer>
    );

    return (
        <MapContainer 
            center={center} 
            zoom={1} 
            scrollWheelZoom
            style={{ height: (mode==='live')?'85vh':'100%', width: '100%' }}
            crs={L.CRS.Simple}
            ref={mapRef}
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
