import React, { useState, useEffect } from "react";
import { database } from "../../../api/firebase-config";
import { onValue, ref } from "firebase/database";
import Heatmap from "./Heatmap";

const LiveHeatmap = () => {
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
}

export default LiveHeatmap;