import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import FilterSidebar from "./FilterSidebar";

const AnalyticsTab = () => {

 

    return (
        <div className="flex flex-col justify-evenly items-center h-3/4 w-full bg-base-200">
            
            
            <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            {/* <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Filter</label>
            </div> */}
            
            <div className="drawer-content ">
            <AnalyticsHeatmap />
            <br></br>
            <AnalyticsLineGraph />
                 <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle btn-primary btn-md shadow-xl absolute bottom-3 text-white">
                  {/* flex flex-row w-28 absolute bottom-4 right-4 justify-between z-10 shadow-xl */}
                  
                     <FiFilter />
                </label>
            </div>
                <FilterSidebar  />
            </div>
        </div>
    );
}

export default AnalyticsTab;

