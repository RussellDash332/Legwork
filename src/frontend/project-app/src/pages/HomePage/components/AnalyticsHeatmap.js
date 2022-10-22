import React, { useState, useEffect }from "react";
import L from "leaflet";
import { MapContainer, ImageOverlay, LayersControl, useMap,
         LayerGroup, FeatureGroup, Tooltip, Rectangle } from "react-leaflet";
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import dataPoints from "../../../data/Heatmap";
import { hoverData, thresholds, getColor } from "../../../data/HoverFloorplan";


const Legend = ({ liveCount }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            const legend = L.control({ position: "bottomright" });
            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "info legend");
                let labels = [];
                let fromPercentage;
                let toPercentage;
                let fromCount;
                let toCount;   

                for (let i = 0; i < thresholds.length - 1; i++) {
                    fromPercentage = thresholds[i] / 100;
                    toPercentage = thresholds[i + 1] / 100;
                    fromCount = fromPercentage * liveCount;
                    toCount = toPercentage * liveCount;
                    labels.push(
                        '<i style="background:' +
                        getColor(toCount, liveCount) +
                        '"></i> ' +
                        fromCount +
                        "&ndash;" +
                        toCount
                    );
                }
                div.innerHTML = labels.join("<br>");
                return div;
            }
            legend.addTo(map);
        }
    }, [map]);
    return null;
}

const AnalyticsHeatmap = () => {
    const [liveCount, setLiveCount] = useState(100);
    const bounds = [[0, 0],[602, 1033]];
    const center = [301, 500];

    const renderFloorPlan = () => (
        <LayersControl.Overlay checked name="Floorplan">
            <LayerGroup>
                <ImageOverlay 
                    attribution="&copy; Developed by LegWork Inc." 
                    url={require("../../../assets/images/Test.png")} 
                    bounds={bounds} 
                />
                {hoverData.map((data) => {
                 return (
                 <FeatureGroup pathOptions={{ color: getColor(data.liveCount, liveCount) }}>
                        <Rectangle bounds={data.bounds} fill fillOpacity={0.8}>
                            <Tooltip>
                                {`Live Count: ${data.liveCount}`} <br/>
                                {`Day Count: ${data.dayCount}`}
                            </Tooltip>
                        </Rectangle>
                    </FeatureGroup>
                 );
                }
                )}
            </LayerGroup>
        </LayersControl.Overlay>
    )

    return (
        <MapContainer 
            center={center} 
            zoom={1} 
            scrollWheelZoom
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
            <LayersControl position="topright">
                {renderFloorPlan()}
            </LayersControl>
        </MapContainer>
    );
};

export default AnalyticsHeatmap;