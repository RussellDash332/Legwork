import React from "react";

const ScaleControl = (props) => {
    return (
        <div className="form-control w-full max-w-xs rounded-md shadow-2xl absolute bottom-4 left-14 z-10 bg-base-100 px-3">

            {/* Range Labels */}
            <label className="label">
                <span className="label-text-alt font-bold">1%</span>
                <span className="label-text-alt font-bold">50%</span>
                <span className="label-text-alt font-bold">100%</span>
            </label>

            {/* Range Slider */}
            <div className="form-control mb-2 mx-2 items-center">
                <input type="range" 
                    min={1} max={100}
                    value={props.scale} 
                    onChange={(e) => props.setScale(e.currentTarget.value)} 
                    className="range range-xs range-primary" /> 
                <span className="label-text-alt font-bold mt-2 text-primary">Scale Components {props.scale}</span>
            </div>
        </div>
    );
}

export default ScaleControl;