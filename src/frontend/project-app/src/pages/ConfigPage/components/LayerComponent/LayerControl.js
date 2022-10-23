import React, { useContext, useEffect, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import FlowContext from "../FlowComponent/FlowContext";

const LayerControl = (props) => {
    const { gridBgToggle, setGridBgToggle, floorplanBgToggle, setFloorplanBgToggle } = useContext(FlowContext);
    const [floorplan, setFloorplan] = useState(""); // Floorplan image link

    const toggleGrid = () => {
        setGridBgToggle(!gridBgToggle);
    }

    const toggleFloorplan = () => {
        setFloorplanBgToggle(!floorplanBgToggle);
    }

    const uploadFloorplan = () => {
        setFloorplan("link");
    }

    return (
        <div className="form-control w-48 rounded-md shadow-xl absolute top-20 right-4 z-10 bg-base-100 px-3">
            <div className="mt-2">
                <span className="label-text font-bold text-primary text-base">Layers</span>
            </div>

            <div className="form-control">
                <label className="label cursor-pointer w-max">
                    <input type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                        checked={gridBgToggle} 
                        onClick={toggleGrid} />
                    <span className="label-text font-bold ml-3">Gridlines</span> 
                </label>
            </div>

            <div className="form-control flex-row justify-between items-center">
                <label className="label cursor-pointer w-max">
                    <input type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs" 
                        checked={floorplanBgToggle}
                        onClick={uploadFloorplan} 
                        disabled={!(floorplan)} />
                    <span className="label-text font-bold ml-3">Floorplan</span>                   
                </label>

                <a href="#uploadFloorplan">
                    <IoIosCloudUpload className="btn btn-square btn-xs btn-ghost"/>  
                </a>
                
            </div>
            
        </div>
    );
}

export default LayerControl;