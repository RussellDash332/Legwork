import React, { useContext, useEffect, useState } from "react";
import FlowContext from "../FlowComponent/FlowContext";

import ViewPath from "./ViewPath";
import ViewSpot from "./ViewSpot";

const ViewNode = () => {
    const { nodes, edges } = useContext(FlowContext);

    const [pathArray, setPathArray] = useState([]);
    const [spotArray, setSpotArray] = useState([]);

    useEffect(() => {
        setPathArray(getPaths(nodes, edges));
        setSpotArray(getSpots(nodes));       
    }, [nodes, edges])

    const getSpots = (nodes) => {
        let spotsArray = nodes.filter((node) => node.type === "camera");

        spotsArray = spotsArray.map(node => {

            const spotData = {
                id: node.id,
                label: node.data.label,
                position: node.position,               
            };

            return spotData;
        })
        
        return spotsArray;
    }

    const getPaths = (nodes, edges) => {
        let pathsArray = [];

        for (let i = 0; i < edges.length; i++) {
            const currEdge = edges[i];

            const id1 = currEdge.source;
            const id1Data = nodes.find((node) => node.id === id1);
            const label1 = id1Data.data.label;
            const position1 = id1Data.position;
            const leftDirection = ['cameraTopLeft', 'cameraBottomRight', 'cameraRightUp', 'cameraLeftDown'];
            const direction1 = (leftDirection.includes(id1Data.type)) ? 0 : 1; //0 is left, 1 is right

            const id2 = currEdge.target;
            const id2Data = nodes.find((node) => node.id === id2);
            const label2 = id2Data.data.label;
            const position2 = id2Data.position;
            const direction2 = (leftDirection.includes(id2Data.type)) ? 0 : 1; //0 is left, 1 is right

            const pathName = "[" + label1 + "]-[" + label2 + "]";

            const vertNodes = ['cameraTopRight', 'cameraBottomRight', 'cameraTopLeft', 'cameraBottomLeft'];
            const orientation = (vertNodes.includes(id1Data.type)) ? "vertical" : "horizontal";
            const pathID = currEdge.id;

            const pathObj = {
                pathName: pathName,
                pathID: pathID,
                orientation: orientation,
                id1: id1,
                label1: label1,
                direction1: direction1,
                position1: position1,
                id2: id2,
                label2: label2,
                direction2: direction2,
                position2: position2
            }

            pathsArray = [...pathsArray, pathObj];
        }

        return pathsArray;
    }


    return (
        <>
            <input type="checkbox" id="viewNode" className="modal-toggle" />
            
            <div className="modal">
            <div className="modal-box max-w-fit overflow-hidden">

                {/* Close button */}
                <label htmlFor="viewNode" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                {/* Title */}
                <div className="form-control mb-4">
                    <h3 className="font-bold text-2xl">View Components</h3>
                </div>

                {/* Content */}
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="card shadow-xl h-[70vh] w-[80vw] overflow-scroll no-scrollbar">
                    <div className="card-body py-4">

                    {/* Path Collapse  */}
                    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-bold">
                            Paths
                        </div>
                        <div className="collapse-content"> 
                            {pathArray.map((pathObj) => {
                                if (pathObj.hasOwnProperty("pathName")) {
                                    return (<ViewPath 
                                            pathName={pathObj.pathName}
                                            pathID={pathObj.pathID}
                                            orientation = {pathObj.orientation}
                                            id1 = {pathObj.id1}
                                            label1 = {pathObj.label1}
                                            direction1 = {pathObj.direction1}
                                            id2 = {pathObj.id2}
                                            label2 = {pathObj.label2}
                                            direction2 = {pathObj.direction2}
                                        />);
                                }
                            })}
                        </div>
                    </div>

                    {/* Spot Collapse  */}
                    <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                        <input type="checkbox" /> 
                        <div className="collapse-title text-xl font-bold">
                            Spots
                        </div>
                        <div className="collapse-content"> 
                            {spotArray.map((spotObj) => {
                                if (spotObj.hasOwnProperty("id")) {
                                    return (<ViewSpot 
                                            id = {spotObj.id}
                                            label = {spotObj.label}
                                        />);
                                }
                            })}
                        </div>
                    </div>

                    </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default ViewNode;