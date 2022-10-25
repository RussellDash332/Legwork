import { createContext, useEffect, useState, useContext } from "react";
import { useNodesState, useEdgesState } from 'reactflow';
import { getNodeScale, getUserNodes } from "../../../../api/firebase-db";
import { getFloorplanImage } from "../../../../api/firebase-storage";
import { UserContext } from "../../../ProtectedRoute";
import { CameraNodeObject, CameraTopNodeObject, CameraBottomNodeObject, FlowEdgeObject, ImageNodeObject } from "./FlowObjects";
import { Camera, CameraBottom, CameraTop, Floorplan } from "./CustomFlowNode";

const FlowContext = createContext();

// const initialNodes = [
//     { id: 'empty', position: { x: 0, y: 0 }, type: "empty", hidden: true, selectable: false, deletable: false }
// ];
  
const nodeTypes = {
    camera: Camera,
    cameraTop: CameraTop,
    cameraBottom: CameraBottom,
    image: Floorplan
};

export const FlowContextProvider = ({children}) => {
    const { user } = useContext(UserContext);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nextPosID, setNextPosID] = useState(1);
    const [gridBgToggle, setGridBgToggle] = useState(true);
    const [floorplanBgToggle, setFloorplanBgToggle] = useState(true);
    const [uploadImage, setUploadImage] = useState([]);
    const [floorplanImage, setFloorplanImage] = useState([]);
    const [scale, setScale] = useState(50);

    useEffect(() => {
        // Retrieve exisitng flow component state
        getUserNodes(user.uid,
        (nodeData) => {
            if (nodeData) {

                if (nodeData.nodes) {
                    const nodes = nodeData.nodes;
                    setNodes(nodes);
                    setNextPosID(nodes.length + 1); 
                }

                if (nodeData.edges) {
                    const edges = nodeData.edges;
                    setEdges(edges);
                }
            }
        })
        
        // Retrieve existing image
        getFloorplanImage(user.uid,
        (img_data) => {
            // console.log("in flow context");
            // console.log(img_data.hasOwnProperty('data_url'));

            if (img_data.hasOwnProperty('data_url')) {
                // console.log("image set to state");
                const currentData = [img_data];
                setFloorplanImage(currentData);
            }
        });

        // Retrieve node scaling
        getNodeScale(user.uid,
        (nodeScale) => {
            setScale(nodeScale);
        })

    }, [])

    useEffect(() => {
        if (floorplanImage.length !== 0) {
            if (floorplanBgToggle) {
                console.log("useeffect:", floorplanImage)
                generateFloorplanNode(floorplanImage[0].data_url);
                console.log("image node generated")
            } else {
                removeFloorplanNode();
            }
        }
    }, [floorplanImage, floorplanBgToggle])

    const generateID = () => {
        setNextPosID((prev) => prev + 1)

        return nextPosID;
    }

    const isUniqueID = (target_id) => {
        return !nodes.some(node => node.id === target_id);
    }

    const generatePath = (id1, label1, id2, label2) => {
        const node_posID = generateID();
        // console.log(node_posID);
    
        // Node 1
        const newNode1 = new CameraTopNodeObject(
            id1,
            label1,
            node_posID * 100,
            100
        );
    
        // Node 2
        const newNode2 = new CameraBottomNodeObject(
            id2,
            label2,
            node_posID * 100,
            300
        );
    
        // Edge
        const newEdge = new FlowEdgeObject(
            id1,
            id2,
        );
    
        setNodes((nds) => nds.concat([newNode1, newNode2]));
        setEdges((edg) => edg.concat(newEdge));
    }
    
    const generateSpot = (id, label) => {
        const node_posID = generateID();
        // console.log(node_posID);
    
        // Node
        const newNode = new CameraNodeObject(
            id,
            label,
            node_posID * 100,
            200
        );
    
        setNodes((nds) => nds.concat(newNode));
    }

    const generateFloorplanNode = (url) => {

        // Check if an image node already exists
        const ImageNodeIdx = nodes.findIndex((node) => {return node.type === "image"});
        console.log(ImageNodeIdx);

        const newNode = new ImageNodeObject(url);

        if (ImageNodeIdx === -1) { // if image node does not exists

            console.log("inserting new image node");
            setNodes((nds) => nds.concat(newNode)); // Add new node

        } else { // if image node exists

            const arr = [...nodes]
            arr.splice(ImageNodeIdx, 1, newNode);
            setNodes(arr);
        }
    }

    const removeFloorplanNode = () => {
        const ImageNodeIdx = nodes.findIndex((node) => {return node.type === "image"});
        const arr = [...nodes]

        if (ImageNodeIdx !== -1) {
            arr.splice(ImageNodeIdx, 1);
        }

        setNodes(arr);
    }

    return (
        <FlowContext.Provider
            value={{
                nodes,
                setNodes,
                onNodesChange,
                edges,
                setEdges,
                onEdgesChange,
                nodeTypes,
                generatePath,
                generateSpot, 
                isUniqueID,
                gridBgToggle,
                setGridBgToggle,
                floorplanBgToggle,
                setFloorplanBgToggle,
                floorplanImage, 
                setFloorplanImage,
                uploadImage,
                setUploadImage,
                scale,
                setScale,
                nextPosID
            }}
        >
            {children}
        </FlowContext.Provider>
    );
}

export default FlowContext;