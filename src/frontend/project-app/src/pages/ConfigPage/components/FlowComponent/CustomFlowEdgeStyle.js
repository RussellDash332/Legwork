import React, { useContext } from 'react';
import { getStraightPath } from 'reactflow';
import FlowContext from './FlowContext';
import { AiOutlineSwap } from 'react-icons/ai';
import { MdCropRotate, MdFlip } from 'react-icons/md';

import './CustomEdgeStyle.css';

const foreignObjectSize = 42;

const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
  };

export const ButtonEdge = ({
    id,
    source, target,
    sourceX, sourceY,
    targetX, targetY,
    sourcePosition, targetPosition,
    style = {},
    markerEnd,
}) => {

    const { swapNodes, rotatePath, flipNodes } = useContext(FlowContext);

    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

  return (
    <>
        <path
            id={id}
            style={style}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
        />

        <foreignObject
            width={foreignObjectSize}
            height={foreignObjectSize}
            x={labelX - foreignObjectSize / 2}
            y={labelY - foreignObjectSize / 2}
            className="edgebutton-foreignobject"
            requiredExtensions="http://www.w3.org/1999/xhtml"
        >
            <body>
                <div className="w-full h-full flex flex-col justify-around">
                    <div className="flex w-full justify-center">
                        <button className='edgebutton flex justify-center items-center' onClick={() => flipNodes(source, target)}>
                            <MdFlip />
                        </button>
                    </div>

                    <div className="flex w-full justify-around">
                        <button className='edgebutton flex justify-center items-center' onClick={() => swapNodes(source, target)}>
                            <AiOutlineSwap />
                        </button>
                        <button className='edgebutton flex justify-center items-center' onClick={() => rotatePath(source, target)}>
                            <MdCropRotate />
                        </button>
                    </div>
                </div>
            </body>
        </foreignObject>
    </>
  );
}