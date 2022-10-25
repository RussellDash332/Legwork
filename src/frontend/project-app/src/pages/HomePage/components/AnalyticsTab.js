import React, { useState } from "react";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import FilterSidebar from "./FilterSidebar";

import { addDays } from "date-fns";

const AnalyticsTab = () => {
    
    // to toggle 'year' if no existing filter or 
    // untoggle 'year' if its filtered by year and to 
    const updateToggle = (value) => {
        if (toggle === value) {
            setToggle("");
            return;
        }

        setToggle(value);
    }

    // When setToggle is called, the toggle value will be passed into 
    // Heatmap and LineGraph
    const [toggle, setToggle] = useState("");    

    const [filterValue, setFilterValue] = useState({
        start: "00:00",
        end: "23:59"
    })

    // Date range comp value handlers

    // Date state
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'

        }
    ]) 

    return (
        <div className="flex flex-col justify-evenly items-center h-full w-full bg-gray-700">
            {/* AnalyticsTab */}
            <AnalyticsHeatmap />
            <br></br>
            <AnalyticsLineGraph />

            <FilterSidebar 
                filterValue = {filterValue} 
                setFilterValue = {setFilterValue}
                rangeValue = {range}
                setRangeValue = {setRange} 
                setToggle = {updateToggle} 
                />
        </div>
    );
}

export default AnalyticsTab;