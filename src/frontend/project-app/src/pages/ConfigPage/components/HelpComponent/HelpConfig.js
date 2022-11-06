import React from "react";

const HelpConfig = () => {
    return (
        <>
            <input type="checkbox" id="helpConfig" className="modal-toggle" />

            <div className="modal">
            <div className="modal-box max-w-min no-scrollbar">
                {/* Close button */}
                <label htmlFor="helpConfig" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                {/* Title */}
                <div className="form-control mb-4">
                    <h3 className="font-bold text-2xl">Help</h3>
                </div>
            </div>
            </div>
        </>
    );
}

export default HelpConfig;