import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

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
    orientation,
    id1,
    label1,
    id2,
    label2 }) => {

    return (
        <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box my-2">
            <input type="checkbox" /> 
            <div className="collapse-title text-base font-medium">
                {pathName}
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

export default ViewPath;