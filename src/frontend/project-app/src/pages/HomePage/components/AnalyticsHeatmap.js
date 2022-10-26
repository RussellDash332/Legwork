import React, { useState, useEffect }from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { hoverData, thresholds, getColor } from "../../../data/HoverFloorplan";
import { database } from "../../../api/firebase-config";
import { onValue, ref } from "firebase/database";
import Heatmap from "./Heatmap";

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

    // console.log("Projects:", projects);

    useEffect(() => {
        const query = ref(database, "users");
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
    
          if (snapshot.exists()) {
            Object.values(data).forEach((project) => {
              setProjects((projects) => [...projects, project]);
            });
          }
        });
    }, []);

    return (
        <Heatmap liveCount={liveCount} />
    );
};

export default AnalyticsHeatmap;