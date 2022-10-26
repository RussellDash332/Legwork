import React from "react";
import L from "leaflet";
import { MapContainer, ImageOverlay, LayersControl,
         LayerGroup, FeatureGroup, Tooltip, Rectangle } from "react-leaflet";
// import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
// import dataPoints from "../../../data/Heatmap";
import { hoverData, getColor } from "../../../data/HoverFloorplan";
import Gridimage from "../../../assets/images/Gridlines.jpeg";
import Floorplan from "../../../assets/images/Floorplan.png";

const Heatmap = ({ liveCount }) => {
    const bounds = [[0, 0],[602, 1033]];
    const center = [301, 500];

    const renderHoverData = () => (
        hoverData.map((data) => (
            <FeatureGroup pathOptions={{ color: getColor(data.liveCount, liveCount) }}>
                <Rectangle bounds={data.bounds} fill fillOpacity={0.8}>
                    <Tooltip>
                        {`Live Count: ${data.liveCount}`} <br/>
                        {`Day Count: ${data.dayCount}`}
                    </Tooltip>
                </Rectangle>
            </FeatureGroup>
        ))
    );

    const renderFloorPlan = () => (
        <LayersControl.BaseLayer checked name="Floorplan">
            <LayerGroup>
                <ImageOverlay 
                    attribution="&copy; Developed by LegWork Inc." 
                    url={Floorplan} 
                    bounds={bounds} 
                />
                {renderHoverData()}
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
                {renderHoverData()}
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