import React from "react";

const HelpConfig = () => {
    return (
        <div className="modal" id="helpConfig">
        <div className="modal-box max-w-min no-scrollbar">
            {/* Close button */}
            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</a>

            {/* Title */}
            <div className="form-control mb-4">
                <h3 className="font-bold text-2xl">Help</h3>
            </div>
        </div>
        </div>
    );
}

export default HelpConfig;