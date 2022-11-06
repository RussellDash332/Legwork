import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import FilterSidebar from "./FilterSidebar";

const AnalyticsTab = () => {

 

    return (
        <><div className="flex flex-col justify-evenly items-center h-3/4 w-full bg-base-200">

            <AnalyticsHeatmap />
            {/* <AnalyticsLineGraph /> */}
            <br></br>

            <AnalyticsLineGraph />
            <br></br>
        </div>
        <div className="drawer drawer-end">
                <input id="filter-drawer" type="checkbox" className="drawer-toggle transition" />
                <div className="drawer-content w-full">
                    <label htmlFor="filter-drawer" className="drawer-button btn btn-circle btn-primary btn-md shadow-xl relative top-10 left-100 text-white">
                        <FiFilter />
                    </label>
                </div>

                <FilterSidebar />
            </div></>
        
    );
}

export default AnalyticsTab;

