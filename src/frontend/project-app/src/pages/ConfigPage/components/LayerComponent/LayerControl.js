import React, { useContext, useEffect, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import FlowContext from "../FlowComponent/FlowContext";

const LayerControl = (props) => {
    const { gridBgToggle, setGridBgToggle } = useContext(FlowContext);
    const [gridToggle, setGridToggle] = useState(true);
    const [floorplanToggle, setFloorplanToggle] = useState(true);
    const [floorplan, setFloorplan] = useState(""); // Floorplan image link

    const clickGrid = () => {
        setGridBgToggle(!gridBgToggle);
    }

    const clickFloorplan = () => {
        setFloorplanToggle(!floorplanToggle);
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
                        onClick={clickGrid} />
                    <span className="label-text font-bold ml-3">Gridlines</span> 
                </label>
            </div>

            <div className="form-control flex-row justify-between items-center">
                <label className="label cursor-pointer w-max">
                    <input type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs" 
                        checked={floorplanToggle}
                        onClick={clickFloorplan} 
                        disabled={!(floorplan)} />
                    <span className="label-text font-bold ml-3">Floorplan</span>                   
                </label>
                <IoIosCloudUpload className="btn btn-square btn-xs btn-ghost" onClick={uploadFloorplan}/>  
            </div>
            
        </div>
    );
}

export default LayerControl;