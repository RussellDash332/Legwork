import React, { useEffect, useState } from "react";

const AddSpot = () => {
    const [cameraName1, setCameraName1] = useState("");
    const [cameraID1, setCameraID1] = useState("");

    const [saveToggle, setSaveToggle] = useState(false);

    const clickSave = () => {
        setSaveToggle(true);
    }

    useEffect(() => {
        if (saveToggle) {


            // Add data to storage
            setTimeout(() => {
                setSaveToggle(false);
                document.getElementById("close-addSpot").click();
            }, 3000)



        }
    }, [saveToggle])

    return (
        <div className="modal" id="addSpot">
        <div className="modal-box max-w-min no-scrollbar">
            {/* Close button */}
            <a id="close-addSpot" href="#"/>
            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</a>

            {/* Title */}
            <div className="form-control mb-4">
                <h3 className="font-bold text-2xl">Add New Spot</h3>
            </div>
            
            {/* Content */}
            <div className="flex flex-col w-full lg:flex-row">

                {/* Card */}
                <div className="card w-96 bg-primary shadow-xl">
                <div className="card-body py-5">
                    <h2 className="card-title text-white font-bold">Camera 1</h2>
                    
                    <p className="label-text-alt text-white text-end"> Camera Name </p>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        value={cameraName1} 
                        onChange={(e) => setCameraName1(e.currentTarget.value)}
                        disabled={saveToggle} />

                    <p className="label-text-alt text-white text-end"> Device ID </p>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        value={cameraID1} 
                        onChange={(e) => setCameraID1(e.currentTarget.value)}
                        disabled={saveToggle} />
                </div>
                </div>

            </div>

            <div className="flex justify-center pt-5">
            <button className={(saveToggle) ? "btn btn-primary loading" : "btn btn-primary"} onClick={clickSave}>Save & Add</button>
            </div>
        </div>
        </div>
    );
}

export default AddSpot