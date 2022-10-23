import React, { memo } from "react";
import { Handle } from "reactflow";

import "./CustomNodeStyle.css";

export const arrow = memo(({data, isConnectable}) => {
    return (
        <>
            <Handle
                type="target"
                position="left"
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <div className="arrow-pointer">

            </div>
        </>
    );
})


export const camera = memo(({data, isConnectable}) => {
    return (
        <>
            <Handle
                type="target"
                position="bottom"
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="bottom"
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <div>
                <div className="square">
                    <strong>{data.label}</strong>
                </div>
                <div className="trapezoid"/>
            </div>
        </>
    );
})

export const image = memo(({data, isConnectable}) => {
    return (
        <>
            <div>
                {/* Image */}
            </div>
        </>
    );
})