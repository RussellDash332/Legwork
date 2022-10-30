import React, { useState, useEffect } from "react";

// const spotData = {
//     id: node.id,
//     label: node.data.label,
//     position: node.position,               
// };

const ViewSpot = (props) => {
    useEffect(() => {
        console.log("inside", props.pathName)
    }, [])
    


    return (
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box my-2">
            <input type="checkbox" /> 
            <div className="collapse-title text-base font-medium">
                {props.id}
            </div>
            <div className="collapse-content"> 
                <p>tabIndex={0} attribute is necessary to make the div focusable</p>
                <p>tabIndex={0} attribute is necessary to make the div focusable</p>
                <p>tabIndex={0} attribute is necessary to make the div focusable</p>
                <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
        </div>
    );
}

export default ViewSpot;