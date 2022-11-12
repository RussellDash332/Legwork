import React from "react";

const PrivacyPolicy = () => {
    return (
        <>
            <input type="checkbox" id="privacyPolicy" className="modal-toggle" />

            <div className="modal">
            <div className="modal-box">
                <label htmlFor="privacyPolicy" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="font-bold text-lg">Privacy Policy</h3>
                <p className="py-4">Policies...</p>
            </div>
            </div>
        </>
    );
}

export default PrivacyPolicy;