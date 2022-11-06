import { createContext, useEffect, useState, useContext } from "react";
import { subscribeCameraLog } from "../../../api/firebase-db";
import { off } from "firebase/database";
import { getNodeScale, getUserNodes } from "../../../api/firebase-db";
import { getFloorplanImage } from "../../../api/firebase-storage";
import { UserContext } from "../../ProtectedRoute";
import { getSpots, getPaths } from "../utils/HeatmapUtils";
import Data from "./NewData";

const CameraDataContext = createContext();
export default CameraDataContext;

export const CameraDataContextProvider = ({children}) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState({}); // Raw data from firebase db
    const [filteredData, setFilteredData] = useState({});
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [floorplanImage, setFloorplanImage] = useState([]);
    const [scale, setScale] = useState(50);
    const [paths, setPaths] = useState([]);
    const [spots, setSpots] = useState([]);

    // Initial Listener on data
    useEffect(() => {
        subscribeCameraLog((logData) => {
            // console.log(logData);
            setData(logData);
            // Cannot put find smallest date here because this would be triggered everytime there is new data in the database
        })
        // if want use local data
        // setData(Data["camera_log"])
    }, [])

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

    useEffect(() => {
        setPaths(getPaths(nodes, edges));
    }, [nodes, edges]);

    useEffect(() => {
        setSpots(getSpots(nodes));
    }, [nodes]);

    useEffect(() => {
        setPaths(getPaths(nodes, edges));
    }, [nodes, edges]);

    return (
        <CameraDataContext.Provider
            value={{
                data,
                filteredData,
                setFilteredData,
                paths,
                spots,
                scale,
                floorplanImage
            }}
        >
            {children}
        </CameraDataContext.Provider>
    );
}




    
    
    
    
    
    
    
    

    


    