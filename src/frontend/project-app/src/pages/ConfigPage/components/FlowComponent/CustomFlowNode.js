import React, { memo, useContext, useState } from "react";
import { Handle } from "reactflow";
import { BsCameraVideoFill } from "react-icons/bs"
import FlowContext from "./FlowContext";

import "./CustomNodeStyle.css";

export const Camera = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))'
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})


/* Vertical-Right */

export const CameraTopRight = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="bottom"
            />
            <Handle
                type="source"
                position="bottom"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))'
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})

export const CameraBottomRight = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="top"
            />
            <Handle
                type="source"
                position="top"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))'
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})

/* Vertical-Left */

export const CameraTopLeft = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="bottom"
            />
            <Handle
                type="source"
                position="bottom"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))',
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1,
                        transform: 'scaleX(-1)'                        
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})

export const CameraBottomLeft = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="top"
            />
            <Handle
                type="source"
                position="top"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))'
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1,
                        transform: 'scaleX(-1)'
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})



/* Horizontal-Up */

export const CameraRightUp = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="left"
            />
            <Handle
                type="source"
                position="left"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))',
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1,
                        transform: 'rotate(270deg)'                        
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})

export const CameraLeftUp = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="right"
            />
            <Handle
                type="source"
                position="right"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))'
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1,
                        transform: 'rotate(270deg)'
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})

/* Horizontal-Down */

export const CameraRightDown = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="left"
            />
            <Handle
                type="source"
                position="left"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))',
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1,
                        transform: 'rotate(90deg)'                        
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})

export const CameraLeftDown = memo(({data}) => {
    const { scale } = useContext(FlowContext);
    return (
        <>
            <Handle
                type="target"
                position="right"
            />
            <Handle
                type="source"
                position="right"
            />

            <div style={{
                    width: 50 * (scale / 50),
                    aspectRatio: 1 / 1,
                    backgroundColor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '4px',
                    backgroundColor: 'hsl(var(--b3))'
                }}>
                <BsCameraVideoFill
                    style={{
                        width: '80%',
                        aspectRatio: 1 / 1,
                        transform: 'rotate(90deg)'
                    }}/>
            </div>

            <div className="labelContainer"
                style={{
                    width: 50 * (scale / 50),
                }}>
                <p className="nodeLabel">{data.label}</p>
            </div>
        </>
    );
})









export const Floorplan = memo(({data}) => {
    return (
        <>
            <div>
                <img src={data.data_url} className="object-contain aspect-[150/65] h-60"/>
            </div>
        </>
    );
})