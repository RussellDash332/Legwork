import React, { useState, useEffect, useContext } from "react";
import FlowContext from "../FlowComponent/FlowContext";

const ViewPathEdit = ({
    pathID,
    id1,
    label1,
    id2,
    label2,
    setEditToggle
}) => {
    const { editPath, isUniqueID } = useContext(FlowContext);

    const [newLabel1, setNewLabel1] = useState(label1);
    const [newID1, setNewID1] = useState(id1);
    const [newLabel2, setNewLabel2] = useState(label2);
    const [newID2, setNewID2] = useState(id2);

    const [saveToggle, setSaveToggle] = useState(false);

    const [uniqueIDError1, setUniqueIDError1] = useState(false);
    const [uniqueIDError2, setUniqueIDError2] = useState(false);
    const [missingIDError1, setMissingIDError1] = useState(false);
    const [missingIDError2, setMissingIDError2] = useState(false);
    const [matchingIDError, setMatchingIDError] = useState(false);
    const [missingNameError1, setMissingNameError1] = useState(false);
    const [missingNameError2, setMissingNameError2] = useState(false);

    useEffect(() => {
        if (saveToggle) {
            if (isEmptyString(newID1) || isEmptyString(newID2) || isEmptyString(newLabel1) || isEmptyString(newLabel2)) {
                if (isEmptyString(newID1)) {
                    setMissingIDError1(true);
                }
    
                if (isEmptyString(newID2)) {
                    setMissingIDError2(true);
                }

                if (isEmptyString(newLabel1)) {
                    setMissingNameError1(true);
                }

                if (isEmptyString(newLabel2)) {
                    setMissingNameError2(true);
                }
    
                setSaveToggle(false);
            } else if (isMatchingID()) {
                setMatchingIDError(true);
                setSaveToggle(false);
            } else if (isUniqueID(newID1) && isUniqueID(newID2)) {
                editPath(pathID, id1, newID1, newLabel1, id2, newID2, newLabel2);
                setSaveToggle(false);
                setEditToggle(false);
            } else {
                setSaveToggle(false);
            }
        }
    }, [saveToggle])

    const clickSave = () => {
        setSaveToggle(true);
    }

    const isEmptyString = (str) => {
        return str === "";
    }

    const isMatchingID = () => {
        return newID1 === newID2;
    }

    useEffect(() => {
        if (!isUniqueID(newID1)) {
            setUniqueIDError1(true);
        } else {
            setUniqueIDError1(false);
        }

        if (!isEmptyString(newID1)) {
            setMissingIDError1(false);
        }

        if (!isMatchingID()) {
            setMatchingIDError(false);
        }
    }, [newID1])


    useEffect(() => {
        if (!isEmptyString(newLabel1)) {
            setMissingNameError1(false);
        }
    }, [newLabel1])

    useEffect(() => {
        if (!isUniqueID(newID2)) {
            setUniqueIDError2(true);
        } else {
            setUniqueIDError2(false);
        }

        if (!isEmptyString(newID2)) {
            setMissingIDError2(false);
        }

        if (!isMatchingID()) {
            setMatchingIDError(false);
        }
    }, [newID2])

    useEffect(() => {
        if (!isEmptyString(newLabel2)) {
            setMissingNameError2(false);
        }
    }, [newLabel2])


    return (
        <div className="p-4 rounded-lg mt-4 min-h-fit bg-base-100">
            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow min-h-fit py-4 card bg-base-300 rounded-box place-items-center">
                    
                    {/* Left Component */}
                    <h2 className="card-title font-bold">Camera 1</h2>
                                                        
                    <p className="label-text-alt  text-end pb-2"> Device Name </p>
                    <input type="text" 
                        placeholder="Type here (max. 12 characters)" 
                        className="input input-bordered w-full max-w-xs"
                        value={newLabel1} 
                        onChange={(e) => setNewLabel1(e.currentTarget.value)}
                        disabled={saveToggle}
                        maxLength={12} />
                    <div className="h-4">
                        {(missingNameError1) 
                            && <label className="label p-0">
                                    <span className="label-text-alt text-red-400">
                                        Device Name cannot be empty
                                    </span>
                                </label>
                        }
                    </div>

                    <p className="label-text-alt  text-end pb-2"> Device ID </p>
                    <input type="text" placeholder="Type here"
                        className={(uniqueIDError1 || missingIDError1 || matchingIDError) 
                            ? "input input-bordered w-full max-w-xs input-error" 
                            : "input input-bordered w-full max-w-xs"}
                        value={newID1} 
                        onChange={(e) => setNewID1(e.currentTarget.value)}
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
                <div className="divider lg:divider-horizontal"/> 
                <div className="grid flex-grow min-h-fit py-4 card bg-base-300 rounded-box place-items-center">

                    {/* Right Component */}
                    <h2 className="card-title font-bold">Camera 2</h2>
                                                        
                    <p className="label-text-alt  text-end pb-2"> Device Name </p>
                    <input type="text" 
                        placeholder="Type here (max. 12 characters)" 
                        className="input input-bordered w-full max-w-xs"
                        value={newLabel2} 
                        onChange={(e) => setNewLabel2(e.currentTarget.value)}
                        disabled={saveToggle}
                        maxLength={12} />
                    <div className="h-4">
                        {(missingNameError2) 
                            && <label className="label p-0">
                                    <span className="label-text-alt text-red-400">
                                        Device Name cannot be empty
                                    </span>
                                </label>
                        }
                    </div>

                    <p className="label-text-alt  text-end pb-2"> Device ID </p>
                    <input type="text" placeholder="Type here"
                        className={(uniqueIDError2 || missingIDError2 || matchingIDError) 
                            ? "input input-bordered w-full max-w-xs input-error" 
                            : "input input-bordered w-full max-w-xs"}
                        value={newID2} 
                        onChange={(e) => setNewID2(e.currentTarget.value)}
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


            <div className="flex justify-center pt-2">
                <button className={(saveToggle) ? "btn btn-primary loading" : "btn btn-primary text-white"} onClick={clickSave}>Save Changes</button>
            </div>


        </div>
    );
}

export default ViewPathEdit;