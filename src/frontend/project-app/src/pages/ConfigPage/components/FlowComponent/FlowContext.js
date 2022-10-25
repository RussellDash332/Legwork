import { createContext, useEffect, useState, useContext } from "react";
import { useNodesState, useEdgesState } from 'reactflow';
import { getNodeScale, getUserNodes } from "../../../../api/firebase-db";
import { getFloorplanImage } from "../../../../api/firebase-storage";
import { UserContext } from "../../../ProtectedRoute";
import { CameraNodeObject, CameraTopNodeObject, CameraBottomNodeObject, FlowEdgeObject, ImageNodeObject } from "./FlowObjects";
import { Camera,
    CameraBottomRight, CameraTopRight, CameraBottomLeft, CameraTopLeft,
    CameraRightUp, CameraLeftUp, CameraRightDown, CameraLeftDown,
    Floorplan } from "./CustomFlowNode";
import { ButtonEdge } from "./CustomFlowEdgeStyle";

const FlowContext = createContext();

const initialNodes = [
    { id: 'ewb-1', position: { x: 0, y: 0 }, data: {label: "1"}, type: "cameraRightUp" },
    { id: 'ewb-2', position: { x: 50, y: 50 }, data: {label: "2"}, type: "cameraLeftUp"}
];

const initialEdges = [
    {
      id: 'edge-1-2',
      source: 'ewb-1',
      target: 'ewb-2',
      type: 'buttonEdge',
    },
  ];
  
const nodeTypes = {
    camera: Camera,
    cameraTopRight: CameraTopRight, // Vertical
    cameraBottomRight: CameraBottomRight,
    cameraTopLeft: CameraTopLeft,
    cameraBottomLeft: CameraBottomLeft,
    cameraRightUp: CameraRightUp, // Horizontal
    cameraLeftUp: CameraLeftUp,
    cameraRightDown: CameraRightDown,
    cameraLeftDown: CameraLeftDown,
    image: Floorplan
};

const edgeTypes = {
    buttonEdge: ButtonEdge
}

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

    /* Adding Path/Spots */
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

    /* Floorplan Background */
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

    /* Node Swapping */
    const oppositeSwapTypes = (initialType) => {

        /* Vertical-Right */
        if (initialType === "cameraTopRight") {
            return "cameraBottomRight";
        }

        if (initialType === "cameraBottomRight") {
            return "cameraTopRight";
        }

        /* Vertical-Left */
        if (initialType === "cameraTopLeft") {
            return "cameraBottomLeft";
        }

        if (initialType === "cameraBottomLeft") {
            return "cameraTopLeft";
        }

        /* Horizontal-Up */
        if (initialType === "cameraRightUp") {
            return "cameraLeftUp";
        }

        if (initialType === "cameraLeftUp") {
            return "cameraRightUp";
        }

        /* Horizontal-Down */
        if (initialType === "cameraRightDown") {
            return "cameraLeftDown";
        }

        if (initialType === "cameraLeftDown") {
            return "cameraRightDown";
        }

    }

    const swapNodes = (sourceID, targetID) => {
        setNodes((nds) => nds.map((node) => {
            if (node.id === sourceID || node.id === targetID) {
                node.type = oppositeSwapTypes(node.type);
            }
            return node;
        }))
    }

    /* Path Rotate */
    const oppositeRotateTypes = (initialType) => {
        /* Vertical to Horizontal */
        if (initialType === "cameraTopRight" || initialType === "cameraTopLeft") {
            return "cameraLeftUp";
        }

        if (initialType === "cameraBottomRight" || initialType === "cameraBottomLeft") {
            return "cameraRightUp";
        }

        /* Horizontal to Vertical */
        if (initialType === "cameraLeftUp" || initialType === "cameraLeftDown") {
            return "cameraTopRight";
        }

        if (initialType === "cameraRightUp" || initialType === "cameraRightDown") {
            return "cameraBottomRight";
        }

    }

    const rotatePath = (sourceID, targetID) => {
        setNodes((nds) => nds.map((node) => {
            if (node.id === sourceID || node.id === targetID) {
                node.type = oppositeRotateTypes(node.type);
            }
            return node;
        }))
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
                edgeTypes,
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
                swapNodes,
                rotatePath
            }}
        >
            {children}
        </FlowContext.Provider>
    );
}

export default FlowContext;