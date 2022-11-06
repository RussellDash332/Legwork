import React, { useContext, useEffect, useState } from "react";
import FlowContext from "../FlowComponent/FlowContext";

const AddSpot = () => {
    const { generateSpot, isUniqueID } = useContext(FlowContext);
    const [cameraName1, setCameraName1] = useState("");
    const [cameraID1, setCameraID1] = useState("");

    const [uniqueIDError, setUniqueIDError] = useState(false);
    const [missingIDError, setMissingIDError] = useState(false);
    const [missingNameError1, setMissingNameError1] = useState(false);
    const [saveToggle, setSaveToggle] = useState(false);

    const clickSave = () => {
        setSaveToggle(true);
    }

    const resetInputs = () => {
        setCameraName1("");
        setCameraID1("");
        setUniqueIDError(false);
        setMissingIDError(false);
        setMissingNameError1(false);
    }

    const isEmptyString = (str) => {
        return str === "";
    }

    useEffect(() => {
        if (saveToggle) {
            if (isEmptyString(cameraID1) || isEmptyString(cameraName1)) {
                if (isEmptyString(cameraID1)) {
                    setMissingIDError(true);
                }

                if (isEmptyString(cameraName1)) {
                    setMissingNameError1(true);
                }
                setSaveToggle(false);
            } else if (isUniqueID(cameraID1)) {
                generateSpot(cameraID1, cameraName1);
                resetInputs();
                setSaveToggle(false);
                document.getElementById("close-addSpot").click();
            } else {
                setSaveToggle(false);
            }
        } 
    }, [saveToggle])

    useEffect(() => {
        if (!isUniqueID(cameraID1)) {
            setUniqueIDError(true);
        } else {
            setUniqueIDError(false);
        }

        if (!isEmptyString(cameraID1)) {
            setMissingIDError(false);
        }
    }, [cameraID1])

    useEffect(() => {
        if (!isEmptyString(cameraName1)) {
            setMissingNameError1(false);
        }
    }, [cameraName1])

    return (
        <>
            <input type="checkbox" id="addSpot" className="modal-toggle" />

            <div className="modal">
            <div className="modal-box max-w-min no-scrollbar">
                {/* Close button */}
                <label id="close-addSpot" htmlFor="addSpot"/>
                <label htmlFor="addSpot" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetInputs}>✕</label>

                {/* Title */}
                <div className="form-control mb-2">
                    <h3 className="font-bold text-2xl">Add New Spot</h3>
                </div>

                <hr className="h-1 text-primary bg-primary mb-4"/>
                
                {/* Content */}
                <div className="flex flex-col w-full lg:flex-row">

                    {/* Card */}
                    <div className="card w-96 bg-base-300 shadow-xl h-64">
                    <div className="card-body py-5">
                        <h2 className="card-title font-bold">Camera 1</h2>
                        
                        <p className="label-text-alt text-end"> Camera Name </p>
                        <input type="text" 
                            placeholder="Type here (max. 12 characters)"
                            className="input input-bordered w-full max-w-xs"
                            value={cameraName1} 
                            onChange={(e) => setCameraName1(e.currentTarget.value)}
                            disabled={saveToggle}
                            maxLength={12} />
                        <div className="h-2">
                            {(missingNameError1) 
                                && <label className="label p-0">
                                        <span className="label-text-alt text-red-400">
                                            Device Name cannot be empty
                                        </span>
                                    </label>
                            }
                        </div> 

                        <p className="label-text-alt text-end"> Device ID </p>
                        <input type="text" placeholder="Type here" 
                            className={(uniqueIDError || missingIDError) 
                                ? "input input-bordered w-full max-w-xs input-error" 
                                : "input input-bordered w-full max-w-xs"}
                            value={cameraID1} 
                            onChange={(e) => setCameraID1(e.currentTarget.value)}
                            disabled={saveToggle} />
                        <div className="h-4">
                            {(uniqueIDError || missingIDError) 
                                && <label className="label p-0">
                                        <span className="label-text-alt text-red-400">
                                            {(missingIDError)
                                            ? "Device ID cannot be empty"
                                            : "Device ID has already been used"}
                                        </span>
                                    </label>
                            }
                        </div>
                    </div>
                    </div>

                </div>

                <div className="flex justify-center pt-5">
                <button className={(saveToggle) ? "btn btn-primary loading" : "btn btn-primary text-white"} onClick={clickSave}>Create & Add</button>
                </div>
            </div>
            </div>
        </>
    );
}

export default AddSpot