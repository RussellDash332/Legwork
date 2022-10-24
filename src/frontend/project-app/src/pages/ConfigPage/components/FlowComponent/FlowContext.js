import { createContext, useEffect, useState, useContext } from "react";
import { useNodesState, useEdgesState } from 'reactflow';
import { getUserNodes } from "../../../../api/firebase-db";
import { getFloorplanImage } from "../../../../api/firebase-storage";
import { UserContext } from "../../../ProtectedRoute";
import { FlowNodeObject, FlowEdgeObject } from "./FlowObjects";
import { camera, image } from "./CustomFlowNode";

const FlowContext = createContext();

// const initialNodes = [
//     { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: 0 } },
//     { id: '2', data: { label: 'Node 2' }, position: { x: 1400, y: 600 } },
//     new FlowNodeObject('3', 'node 3', 300, 300)
//   ];
  
//   const initialEdges = [{ id: 'e1-2', source: '1', target: '2' , type: 'step'}];

const nodeTypes = {
    camera: camera,
    image: image
};

export const FlowContextProvider = ({children}) => {
    const { user } = useContext(UserContext);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nextPosID, setNextPosID] = useState(1);
    const [gridBgToggle, setGridBgToggle] = useState(true);
    const [floorplanBgToggle, setFloorplanBgToggle] = useState(true);
    const [floorplanImage, setFloorplanImage] = useState([]);

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
                setFloorplanImage((prev) => prev.concat(currentData));
            }
        });
    }, [])

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
        const newNode1 = new FlowNodeObject(
            id1,
            label1,
            node_posID * 100,
            100
        );
    
        // Node 2
        const newNode2 = new FlowNodeObject(
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
        const newNode = new FlowNodeObject(
            id,
            label,
            node_posID * 100,
            200
        );
    
        setNodes((nds) => nds.concat(newNode));
    }

    return (
        <FlowContext.Provider
            value={{
                nodes,
                onNodesChange,
                edges,
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
                nextPosID
            }}
        >
            {children}
        </FlowContext.Provider>
    );
}

export default FlowContext;