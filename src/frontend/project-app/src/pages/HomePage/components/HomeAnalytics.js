import React, { useEffect, useState } from "react";

const HomeAnalytics = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-slate-200 justify-start">
            <h1 className="text-5xl font-bold p-4 text-indigo-700">Megan's Supermarket</h1>
            <hr className="w-3/5 h-2 bg-indigo-700 border-0" />
            <div className="mx-auto content-center flex box-border border-4 h-96 w-3/5 m-10 p-4 outline outline-4 outline-blue-300">
                <h1 className="text-5xl mx-auto font-bold p-4 text-blue-700">Heat Map Here</h1>
            </div>
        </div>
    );
}

export default HomeAnalytics;