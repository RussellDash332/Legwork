import React, { useState, useEffect, useContext } from "react";
import FlowContext from "../FlowComponent/FlowContext";

import ViewSpotEdit from "./ViewSpotEdit";

// const spotData = {
//     id: node.id,
//     label: node.data.label,
//     position: node.position,               
// };

const ViewSpot = ({id, label}) => {
    const { deleteSpot } = useContext(FlowContext);
    const [editToggle, setEditToggle] = useState(false);

    const clickEdit = () => {
        setEditToggle(!editToggle);
    }

    const collapseContainer = () => {
        setEditToggle(false);
    }

    return (
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box my-2">
            <input type="checkbox" onChange={collapseContainer} /> 
            <div className="collapse-title text-base font-medium">
                {id}
            </div>
            <div className="collapse-content"> 
                {/* Content */}

                <div className="flex w-full justify-center mb-4">
                    <div className="font-bold text-lg">Spot</div>
                </div>
                

                <div className="stats shadow w-full">
  
                    <div className="stat">
                        <div className="stat-desc overflow-hidden text-ellipsis text-center">Device Name</div>
                        <div className="stat-value text-primary text-xl overflow-hidden text-ellipsis text-center">{label}</div>
                        <div className="stat-desc overflow-hidden text-ellipsis text-center">Device ID: {id}</div>
                    </div>

                </div>

                <div className="flex w-full justify-center mt-4">
                    <div className="flex justify-evenly pl-4 w-2/6">
                        <button className="btn btn-sm btn-outline" onClick={clickEdit}>Edit</button>
                        <button className="btn btn-sm btn-error" onClick={() => {deleteSpot(id)}}>Delete</button>
                    </div>
                </div>

                {(editToggle) 
                && <ViewSpotEdit
                    id = {id}
                    label = {label}
                    setEditToggle={setEditToggle}
                />}


            </div>
        </div>
    );
}

export default ViewSpot;