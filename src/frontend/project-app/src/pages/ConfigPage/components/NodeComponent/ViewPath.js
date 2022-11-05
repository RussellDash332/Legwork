import React, { useState, useEffect, useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import FlowContext from "../FlowComponent/FlowContext";

import ViewPathEdit from "./ViewPathEdit";

// const pathObj = {
//     pathName: pathName,
//     orientation: orientation,
//     id1: id1,
//     label1: label1,
//     direction1: direction1,
//     position1: position1,
//     id2: id2,
//     label2: label2,
//     direction2: direction2,
//     position2: position2
// }

const ViewPath = ({
    pathName,
    pathID,
    orientation,
    id1,
    label1,
    direction1,
    id2,
    label2,
    direction2
 }) => {
    const { deletePath } = useContext(FlowContext);
    const [editToggle, setEditToggle] = useState(false);
    
    const clickEdit = () => {
        setEditToggle(!editToggle);
    }

    const collapseContainer = () => {
        setEditToggle(false);
    }

    return (
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box my-2">
            
            <input type="checkbox" onChange={collapseContainer}/> 
            <div className="collapse-title text-base font-medium">
                {pathName}
            </div>
            <div className="collapse-content"> 
                {/* Content */}

                <div className="flex w-full justify-center mb-4">
                    <div className="font-bold text-lg">{(orientation === "vertical") ? "Vertical" : "Horizontal"} Path</div>
                </div>
                

                <div className="stats shadow w-full">
  
                    <div className="stat">
                        <div className="stat-desc overflow-hidden text-ellipsis">Device Name:</div>
                        <div className="stat-value text-primary text-xl overflow-hidden text-ellipsis">{label1}</div>
                        <div className="stat-desc overflow-hidden text-ellipsis">Device ID: {id1}</div>
                    </div>
         
                    <div className="stat">
                        <div className="stat-desc overflow-hidden text-ellipsis">Device Name:</div>
                        <div className="stat-value text-secondary text-xl overflow-hidden text-ellipsis">{label2}</div>
                        <div className="stat-desc overflow-hidden text-ellipsis">Device ID: {id2}</div>
                    </div>

                </div>

                <div className="flex w-full justify-center mt-4">
                    <div className="flex justify-evenly pl-4 w-2/6">
                        <button className="btn btn-sm btn-outline" onClick={clickEdit}>Edit</button>
                        <button className="btn btn-sm btn-error" onClick={() => {deletePath(pathID, id1, id2)}}>Delete</button>
                    </div>
                </div>

                {(editToggle) 
                && <ViewPathEdit
                    pathID={pathID}
                    id1 = {id1}
                    label1 = {label1}
                    id2 = {id2}
                    label2 = {label2}
                    setEditToggle={setEditToggle}
                />}


                {/* {(deleteToggle) &&
                <div className="alert alert-error shadow-lg absolute h-min w-1/2 bottom-0 right-0 z-50">
                    <div>
                        <span>Delete {pathName} path?</span>
                    </div>

                    <div className="flex-none">
                        <button className="btn btn-sm btn-ghost" onClick={() => {}}>close</button>
                    </div>
                </div>} */}

            </div>
        </div>
    );
}

export default ViewPath;