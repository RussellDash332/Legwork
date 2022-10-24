import React, { memo, useState } from "react";
import { Handle } from "reactflow";
import { BsCameraVideoFill } from "react-icons/bs"

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
            <div>
                <div className="square">
                    <BsCameraVideoFill className="w-1/2"/>
                    <p className="nodeLabel">{data.label}</p>
                </div>
            </div>
        </>
    );
})

export const cameraTop = memo(({data, isConnectable}) => {
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
                    <BsCameraVideoFill />
                    <p className="nodeLabel">{data.label}</p>
                </div>
            </div>
        </>
    );
})

export const cameraBottom = memo(({data, isConnectable}) => {
    return (
        <>
            <Handle
                type="target"
                position="top"
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="top"
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />

            <div>
                <div className="square">
                    <BsCameraVideoFill />
                    <p className="nodeLabel">{data.label}</p>
                </div>
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