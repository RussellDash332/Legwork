import React, { useContext, useEffect, useState } from "react";
import FlowContext from "../FlowComponent/FlowContext";

const AddPath = () => {
    const { generatePath, isUniqueID, scale, setScale } = useContext(FlowContext);
    const [cameraName1, setCameraName1] = useState("");
    const [cameraID1, setCameraID1] = useState("");
    const [cameraName2, setCameraName2] = useState("");
    const [cameraID2, setCameraID2] = useState("");

    const [uniqueIDError1, setUniqueIDError1] = useState(false);
    const [uniqueIDError2, setUniqueIDError2] = useState(false);
    const [missingIDError1, setMissingIDError1] = useState(false);
    const [missingIDError2, setMissingIDError2] = useState(false);
    const [matchingIDError, setMatchingIDError] = useState(false);
    const [missingNameError1, setMissingNameError1] = useState(false);
    const [missingNameError2, setMissingNameError2] = useState(false);
    const [saveToggle, setSaveToggle] = useState(false);
    

    const clickSave = () => {
        setSaveToggle(true);
    }

    const resetInputs = () => {
        setCameraName1("");
        setCameraID1("");
        setCameraName2("");
        setCameraID2("");
        setUniqueIDError1(false);
        setUniqueIDError2(false);
        setMissingIDError1(false);
        setMissingIDError2(false);
        setMatchingIDError(false);
        setMissingNameError1(false);
        setMissingNameError2(false);
    }

    const isEmptyString = (str) => {
        return str === "";
    }

    const isMatchingID = () => {
        return cameraID1 === cameraID2;
    }

    useEffect(() => {
        if (saveToggle) {
            if (isEmptyString(cameraID1) || isEmptyString(cameraID2) || isEmptyString(cameraName1) || isEmptyString(cameraName2)) {
                if (isEmptyString(cameraID1)) {
                    setMissingIDError1(true);
                }
    
                if (isEmptyString(cameraID2)) {
                    setMissingIDError2(true);
                }

                if (isEmptyString(cameraName1)) {
                    setMissingNameError1(true);
                }

                if (isEmptyString(cameraName2)) {
                    setMissingNameError2(true);
                }

                setSaveToggle(false);
            } else if (isMatchingID()) {
                setMatchingIDError(true);
                setSaveToggle(false);
            } else if (isUniqueID(cameraID1) && isUniqueID(cameraID2)) {
                generatePath(cameraID1, cameraName1, cameraID2, cameraName2);
                setScale(scale);
                resetInputs();
                setSaveToggle(false);
                document.getElementById("close-addPath").click();
            } else {
                setSaveToggle(false);
            }
        }
    }, [saveToggle])

    useEffect(() => {
        if (!isUniqueID(cameraID1)) {
            setUniqueIDError1(true);
        } else {
            setUniqueIDError1(false);
        }

        if (!isEmptyString(cameraID1)) {
            setMissingIDError1(false);
        }

        if (!isMatchingID()) {
            setMatchingIDError(false);
        }
    }, [cameraID1])

    useEffect(() => {
        if (!isEmptyString(cameraName1)) {
            setMissingNameError1(false);
        }
    }, [cameraName1])

    useEffect(() => {
        if (!isUniqueID(cameraID2)) {
            setUniqueIDError2(true);
        } else {
            setUniqueIDError2(false);
        }

        if (!isEmptyString(cameraID2)) {
            setMissingIDError2(false);
        }

        if (!isMatchingID()) {
            setMatchingIDError(false);
        }
    }, [cameraID2])

    useEffect(() => {
        if (!isEmptyString(cameraName2)) {
            setMissingNameError2(false);
        }
    }, [cameraName2])

    return (
        <div className="modal" id="addPath">
        <div className="modal-box max-w-min no-scrollbar">
            {/* Close button */}
            <a id="close-addPath" href="#"/>
            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetInputs}>✕</a>

            {/* Title */}
            <div className="form-control mb-2">
                <h3 className="font-bold text-2xl">Add New Path</h3>
            </div>

            <hr className="h-1 text-primary bg-primary mb-4"/>
            
            {/* Content */}
            <div className="flex flex-col w-full lg:flex-row">

                {/* Left Card */}
                <div className="card w-96 bg-base-300 shadow-xl">
                <div className="card-body py-5">
                    <h2 className="card-title font-bold">Camera 1</h2>
                    
                    <p className="label-text-alt  text-end"> Camera Name </p>
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
                        className={(uniqueIDError1 || missingIDError1 || matchingIDError) 
                            ? "input input-bordered w-full max-w-xs input-error" 
                            : "input input-bordered w-full max-w-xs"}
                        value={cameraID1} 
                        onChange={(e) => setCameraID1(e.currentTarget.value)}
                        disabled={saveToggle} />
                    <div className="h-4">
                        {(uniqueIDError1 || missingIDError1 || matchingIDError) 
                            && <label className="label p-0">
                                    <span className="label-text-alt text-red-400">
                                        {(missingIDError1)
                                        ? "Device ID cannot be empty"
                                        : (matchingIDError) 
                                            ? "Device ID must be unique"
                                            :"Device ID has already been used"}
                                    </span>
                                </label>
                        }
                    </div>
                    
                </div>
                </div>

            <div className="divider lg:divider-horizontal"/>

                {/* Right Card */}
                <div className="card w-96 bg-base-300 shadow-xl">
                <div className="card-body py-5">
                    <h2 className="card-title  font-bold">Camera 2</h2>
                    
                    <p className="label-text-alt  text-end"> Camera Name </p>
                    <input type="text" 
                        placeholder="Type here (max. 12 characters)"
                        className="input input-bordered w-full max-w-xs"
                        value={cameraName2} 
                        onChange={(e) => setCameraName2(e.currentTarget.value)}
                        disabled={saveToggle}
                        maxLength={12} />
                    <div className="h-2">
                        {(missingNameError2) 
                            && <label className="label p-0">
                                    <span className="label-text-alt text-red-400">
                                        Device Name cannot be empty
                                    </span>
                                </label>
                        }
                    </div> 

                    <p className="label-text-alt text-end"> Device ID </p>
                    <input type="text" placeholder="Type here" 
                        className={(uniqueIDError2 || missingIDError2 || matchingIDError) 
                            ? "input input-bordered w-full max-w-xs input-error" 
                            : "input input-bordered w-full max-w-xs"}
                        value={cameraID2} 
                        onChange={(e) => setCameraID2(e.currentTarget.value)}
                        disabled={saveToggle} />
                    <div className="h-4">
                        {(uniqueIDError2 || missingIDError2 || matchingIDError) 
                            && <label className="label p-0">
                                    <span className="label-text-alt text-red-400">
                                        {(missingIDError2)
                                        ? "Device ID cannot be empty"
                                        : (matchingIDError) 
                                            ? "Device ID must be unique"
                                            :"Device ID has already been used"}
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
    );
}

export default AddPath