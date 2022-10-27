import React, { useEffect, useState } from "react";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import FilterSidebar from "./FilterSidebar";

const AnalyticsTab = () => {

 

    return (
        <div className="flex flex-col justify-evenly items-center h-full w-full bg-base-200">
            
            <AnalyticsHeatmap />
            {/* <br></br> */}
            <AnalyticsLineGraph />
            <FilterSidebar />
        </div>
    );
}

export default AnalyticsTab;

// div className="drawer-content ">
            
//                 <label htmlFor="my-drawer-4">
//                     <FiFilter className="drawer-button btn btn-circle btn-primary btn-md flex flex-row w-28 absolute bottom-4 right-4 justify-between z-10 shadow-xl text-white"/>
//                 </label>
            
//             </div>