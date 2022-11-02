import React, { useState, useEffect, useContext } from "react";
import FlowContext from "../FlowComponent/FlowContext";

const ViewSpotEdit = ({id, label, setEditToggle}) => {
    const {editSpot , isUniqueID} = useContext(FlowContext);

    const [newLabel1, setNewLabel1] = useState(label);
    const [newID1, setNewID1] = useState(id);

    const [saveToggle, setSaveToggle] = useState(false);

    const [uniqueIDError1, setUniqueIDError1] = useState(false);
    const [missingIDError1, setMissingIDError1] = useState(false);
    const [missingNameError1, setMissingNameError1] = useState(false);


    const clickSave = () => {
        setSaveToggle(true);
    }

    const isEmptyString = (str) => {
        return str === "";
    }

    useEffect(() => {
        if (saveToggle) {
            if (isEmptyString(newID1) || isEmptyString(newLabel1)) {
                if (isEmptyString(newID1)) {
                    setMissingIDError1(true);
                }

                if (isEmptyString(newLabel1)) {
                    setMissingNameError1(true);
                }
                
                setSaveToggle(false);
            } else if (isUniqueID(newID1)) {
                editSpot(id, newID1, newLabel1);
                setSaveToggle(false);
                setEditToggle(false);
            } else {
                setSaveToggle(false);
            }
        } 
    }, [saveToggle])

    useEffect(() => {
        if (!isUniqueID(newID1)) {
            setUniqueIDError1(true);
        } else {
            setUniqueIDError1(false);
        }

        if (!isEmptyString(newID1)) {
            setMissingIDError1(false);
        }
    }, [newID1])


    useEffect(() => {
        if (!isEmptyString(newLabel1)) {
            setMissingNameError1(false);
        }
    }, [newLabel1])
    
    return (
        <div className="p-4 rounded-lg mt-4 min-h-fit bg-base-100">
            <div className="flex flex-col w-full lg:flex-row">
                <div className="grid flex-grow min-h-fit py-4 card bg-base-300 rounded-box place-items-center">

                    {/* Card Component */}
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
                        className={(uniqueIDError1 || missingIDError1) 
                            ? "input input-bordered w-full max-w-xs input-error" 
                            : "input input-bordered w-full max-w-xs"}
                        value={newID1} 
                        onChange={(e) => setNewID1(e.currentTarget.value)}
                        disabled={saveToggle} />
                    <div className="h-4">
                        {(uniqueIDError1 || missingIDError1) 
                            && <label className="label p-0">
                                    <span className="label-text-alt text-red-400">
                                        {(missingIDError1)
                                        ? "Device ID cannot be empty"
                                        : "Device ID has already been used"}
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

export default ViewSpotEdit;