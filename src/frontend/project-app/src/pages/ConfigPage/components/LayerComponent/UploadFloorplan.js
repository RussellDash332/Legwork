import React, { useContext, useEffect, useState } from "react";
import FlowContext from "../FlowComponent/FlowContext";

const UploadFloorplan = () => {
    const { floorplanImage, setFloorplanImage } = useContext(FlowContext);
    const [submitToggle, setSubmitToggle] = useState(false);

    useEffect(() => {
        if (submitToggle) {
            setTimeout(() => {
                setSubmitToggle(false);
                document.getElementById("close-uploadFloorplan").click();
            }, 2000)
        }
    }, [submitToggle])

    const clickSubmit = () => {
        setSubmitToggle(true);
    }

    return (
        <div className="modal" id="uploadFloorplan">
        <div className="modal-box max-w-min no-scrollbar">
            {/* Close button */}
            <a id="close-uploadFloorplan" href="#"/>
            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</a>

            {/* Title */}
            <div className="form-control mb-2">
                <h3 className="font-bold text-2xl">Upload Floorplan</h3>
            </div>

            <hr className="h-1 text-primary bg-primary mb-4"/>

            {/* Content */}
            <div className="w-96">
                {/* Browse */}
                <div className="flex mb-4">
                    <div>
                        <h2>Your file</h2>
                    </div>
                    <button className="btn btn-primary mx-5" disabled={submitToggle}>Browse</button>
                    <div className="w-48 flex items-center">
                        <p className="text-xs text-ellipsis">Only '.jpg', '.jpeg', '.png' extensions allowed</p>
                    </div>
                </div>

                {/* Preview */}
                <div className="flex">
                    <div className="bg-base-300 aspect-[150/65] h-32 rounded-md flex justify-center items-center">
                        {(!floorplanImage.hasOwnProperty())
                        ? <p>(No Image)</p>
                        : <></>}
                    </div>

                    {(floorplanImage.hasOwnProperty()) &&
                    <div className="flex flex-col justify-between">
                        <button className="btn btn-sm btn-circle btn-ghost" disabled={submitToggle}>✕</button>
                        <p className="text-xs text-ellipsis ml-2">(15000kb)</p>
                    </div>}
                    
                </div>

                {/* Submit */}
                <div className="flex justify-center pt-5">
                    <button className={(submitToggle) ? "btn btn-primary loading" : "btn btn-primary"} onClick={clickSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default UploadFloorplan;