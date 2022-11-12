import React from "react";

const TermsOfService = () => {
    return (
        <>
            <input type="checkbox" id="termsOfService" className="modal-toggle" />

            <div className="modal">
            <div className="modal-box">
                <label htmlFor="termsOfService" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <h3 className="font-bold text-lg">Terms of Service</h3>
                <p className="py-4">Terms...</p>
            </div>
            </div>
        </>
    );
}

export default TermsOfService;