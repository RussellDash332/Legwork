import React from "react";
import L from "leaflet";
import { MapContainer, ImageOverlay } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import dataPoints from "../../../data/Heatmap";


const AnalyticsHeatmap = () => {
    const bounds = [[0, 0],[602, 1033]];
    const center = [301, 500];

    return (
        <MapContainer 
            center={center} 
            zoom={1} 
            scrollWheelZoom={false}
            style={{ height: '100vh', width: '100%' }}
            crs={L.CRS.Simple}
        >
            <HeatmapLayer
                points={dataPoints}
                fitBoundsOnLoad
                fitBoundsOnUpdate
                radius={20}
                latitudeExtractor={(m) => m.coordinates[0]}
                longitudeExtractor={(m) => m.coordinates[1]}
                intensityExtractor={(m) => m.intensity}
            />
            <ImageOverlay 
                attribution="&copy; Developed by LegWork Inc." 
                url={require("../../../assets/images/Test.png")} 
                bounds={bounds} 
            />
        </MapContainer>
    );
}

export default AnalyticsHeatmap;