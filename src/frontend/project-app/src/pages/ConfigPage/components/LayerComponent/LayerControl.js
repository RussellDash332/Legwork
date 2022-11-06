import React, { useContext, useEffect, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import FlowContext from "../FlowComponent/FlowContext";

const LayerControl = (props) => {
    const { gridBgToggle, setGridBgToggle,
        floorplanBgToggle, setFloorplanBgToggle,
        floorplanImage } = useContext(FlowContext);

    const toggleGrid = () => {
        setGridBgToggle(!gridBgToggle);
    }

    const toggleFloorplan = () => {
        setFloorplanBgToggle(!floorplanBgToggle);
    }

    return (
        <div className="form-control w-48 rounded-md shadow-xl absolute top-20 right-4 z-[5] bg-base-300 px-3">
            <div className="mt-2">
                <span className="label-text font-bold text-primary text-base">Layers</span>
            </div>

            <div className="form-control">
                <label className="label cursor-pointer w-max">
                    <input type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                        checked={gridBgToggle} 
                        onChange={toggleGrid} />
                    <span className="label-text font-bold ml-3">Gridlines</span> 
                </label>
            </div>

            <div className="form-control flex-row justify-between items-center">
                <label className="label cursor-pointer w-max">
                    <input type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs" 
                        checked={floorplanBgToggle}
                        onChange={toggleFloorplan} 
                        disabled={floorplanImage.length === 0} />
                    <span className="label-text font-bold ml-3">Floorplan</span>                   
                </label>

                <label htmlFor="uploadFloorplan">
                    <IoIosCloudUpload className="btn btn-square btn-xs btn-ghost"/>  
                </label>
                
            </div>
            
        </div>
    );
}

export default LayerControl;