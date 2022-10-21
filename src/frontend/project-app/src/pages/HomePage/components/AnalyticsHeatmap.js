import React from "react";
import { MapContainer, ImageOverlay } from "react-leaflet"
import "leaflet/dist/leaflet.css";

const AnalyticsHeatmap = () => {
    const bounds = [[600, 0],[0, 300]];
    const center = [65, 150];

    return (
        <MapContainer 
            center={center} 
            zoom={2} 
            scrollWheelZoom={false}
            style={{ height: '100vh', width: '100%' }}
        >
            <ImageOverlay 
                attribution="&copy; Developed by LegWork Inc." 
                url={require("../../../assets/images/Test.png")} 
                bounds={bounds} 
            />
        </MapContainer>
    );
}

export default AnalyticsHeatmap;