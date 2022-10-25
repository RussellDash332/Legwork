import React, { useState } from "react";

import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import FilterSidebar from "./FilterSidebar";

const AnalyticsTab = () => {

    const updateToggle = (value) => {
        if (toggle === value) {
            setToggle("");
            return;
        }

        setToggle(value);
    }

    const [toggle, setToggle] = useState("");    

    const [filterValue, setFilterValue] = useState({
        start: "00:00",
        end: "23:59"
    })

    // put all the date range comp value handlers here


    return (
        <div className="flex flex-col justify-evenly items-center h-full w-full bg-gray-700">
            {/* AnalyticsTab */}
<<<<<<< HEAD
            <AnalyticsHeatmap 
                filterValue = {filterValue} 
                rangeValue = {range}
                toggle = {toggle} />
            <AnalyticsLineGraph 
                filterValue = {filterValue} 
                rangeValue = {range}
                toggle = {toggle} />
            <FilterSidebar 
                filterValue = {filterValue} 
                setFilterValue = {setFilterValue}
                rangeValue = {range}
                setRangeValue = {setRange} 
                setToggle = {updateToggle} />
=======
            <AnalyticsHeatmap />
            <br></br>
            <AnalyticsLineGraph />
>>>>>>> frontend
        </div>
    );
}

export default AnalyticsTab;