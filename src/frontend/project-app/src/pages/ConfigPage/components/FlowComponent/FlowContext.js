import { createContext, useEffect, useState } from "react";
import { useNodesState, useEdgesState } from 'reactflow';
import { FlowNodeObject, FlowEdgeObject } from "./FlowObjects";
import { camera } from "./CustomFlowNode";

const FlowContext = createContext();

const initialNodes = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 0 } },
    new FlowNodeObject('3', 'node 3', 300, 300)
  ];
  
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
    camera: camera
};

export const FlowContextProvider = ({children}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nextPosID, setNextPosID] = useState(1);
    const [gridBgToggle, setGridBgToggle] = useState(true);

    useEffect(() => {
        // Read from database
        setNodes(initialNodes);
        setEdges(initialEdges);
    
        // Set next possible id to +1 from current max value
        setNextPosID(initialNodes.length + 1);       
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
        console.log(node_posID);
    
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
        setEdges((edg) => edg.concat(newEdge))
    }
    
    const generateSpot = (id, label) => {
        const node_posID = generateID();
        console.log(node_posID);
    
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
                nextPosID
            }}
        >
            {children}
        </FlowContext.Provider>
    );
}

export default FlowContext;