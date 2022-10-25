import React, { useEffect, useState } from "react";

const ViewNode = () => {
    return (
        <div className="modal" id="viewNode">
        <div className="modal-box max-w-min no-scrollbar">

            {/* Close button */}
            <a id="close-viewNode" href="#"/>
            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</a>

            {/* Title */}
            <div className="form-control mb-4">
                <h3 className="font-bold text-2xl">View Components</h3>
            </div>
        </div>
        </div>
    );
}

export default ViewNode;