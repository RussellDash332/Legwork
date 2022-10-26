import React, { useState, useEffect }from "react";
import L from "leaflet";
import { MapContainer, ImageOverlay, LayersControl, useMap,
         LayerGroup, FeatureGroup, Tooltip, Rectangle } from "react-leaflet";
// import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import "leaflet/dist/leaflet.css";
import dataPoints from "../../../data/Heatmap";
import { hoverData, thresholds, getColor } from "../../../data/HoverFloorplan";
import Gridimage from "../../../assets/images/Gridlines.jpeg";
import Floorplan from "../../../assets/images/Floorplan.png";
import { db } from "../../../api/firebase-config";
import { onValue, ref } from "firebase/database";

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
    const [projects, setProjects] = useState([]);
    const bounds = [[0, 0],[602, 1033]];
    const center = [301, 500];

    console.log("Projects:", projects);

    useEffect(() => {
        const query = ref(db, "users");
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
    
          if (snapshot.exists()) {
            Object.values(data).map((project) => {
              setProjects((projects) => [...projects, project]);
            });
          }
        });
      }, []);

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
        <LayersControl.BaseLayer checked name="Gridlines">
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
            style={{ height: '100vh', width: '100%' }}
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

export default AnalyticsHeatmap;