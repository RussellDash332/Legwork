import { useState, useCallback, useEffect, useContext } from 'react';
import ReactFlow, {
    Controls,
    Background,
    useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowContext from './FlowContext';

const Flow = () => {
  const { nodes, setNodes, onNodesChange,
    edges, setEdges, onEdgesChange,
    nodeTypes,
    gridBgToggle,
    nextPosID } = useContext(FlowContext);

  const { fitView } = useReactFlow();

  useEffect(() => {
    console.log("fit view")
    fitView()
  }, [nodes.length])

  return (
    <div style={{ height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
        >
          {(gridBgToggle) && <Background />}
          <Controls />
          <div>
            {/* <button className="btn absolute z-10 right-0 top-40" onClick={generatePath}>Add</button> */}
            <button className='bth absolute z-10 right-0 top-60' onClick={fitView}>fit</button>
          </div>
          <div>{nextPosID}</div>
        </ReactFlow>
    </div>
  );
}

export default Flow;