import React from "react";
import { AiOutlineNodeIndex } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi"

const AddNode = () => {
    return (
        // Popout Modal
        <>
            <input type="checkbox" id="addNode" className="modal-toggle" />

            <div className="modal">
            <div className="modal-box max-w-min no-scrollbar">
                {/* Close button */}
                <label htmlFor="addNode" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                {/* Title */}
                <div className="form-control mb-2">
                    <h3 className="font-bold text-2xl">Add New Component</h3>
                </div>

                <hr className="h-1 text-primary bg-primary mb-4"/>
                
                {/* Content */}
                <div className="flex flex-col w-full lg:flex-row">

                    {/* Content Left */}
                    <div className="card w-80 bg-base-100 shadow-2xl h-min">

                        {/* Content Image */}
                        <div className="card-body items-center text-center py-3">
                            <figure className="card w-72 px-10 py-5 bg-base-200">
                                <AiOutlineNodeIndex className="h-16 w-16"/>
                            </figure>
                        </div>

                        {/* Content Text */}
                        <div className="card-body items-center text-center pt-0 pb-5">
                            <h2 className="card-title">Path</h2>
                            <p>Usually an aisle or walkway which requires 2 cameras to be monitored</p>
                            <div className="card-actions">
                            <label htmlFor="addPath" className="btn btn-primary text-white">Create</label>
                            </div>
                        </div>

                    </div>

                <div className="divider lg:divider-horizontal">OR</div> 

                    {/* Content Right */}
                    <div className="card w-80 bg-base-100 shadow-2xl">

                        {/* Content Image */}
                        <div className="card-body items-center text-center py-3">
                            <figure className="card w-72 px-10 py-5 bg-base-200">
                                <BiCurrentLocation className="h-16 w-16"/>
                            </figure>
                        </div>

                        {/* Content Text */}
                        <div className="card-body items-center text-center pt-0 pb-5">
                            <h2 className="card-title">Spot</h2>
                            <p>A single area or location which requires 1 camera to be monitored</p>
                            <div className="card-actions">
                            <label htmlFor="addSpot" className="btn btn-primary text-white">Create</label>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            </div>
        </>
    );
}

export default AddNode;