import { useContext } from 'react';
import ReactFlow, {
    Controls,
    Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowContext from './FlowContext';

const Flow = () => {
  const { 
    nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    nodeTypes, edgeTypes,
    gridBgToggle 
  } = useContext(FlowContext);

  return (
    <div className="h-full w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          {(gridBgToggle) && <Background variant="cross"/>}
          <Controls />
        </ReactFlow>
    </div>
  );
}

export default Flow;