import React from "react";

const AnalyticsHeatmap = ({filterValue, toggle}) => {
    
    // FETCH AND DISPLAY DATA

    // 1. fetch data

    // 2. filter/group data
    // 2a. filter -> data.filter(x=> x.whatever == filter)
    // 2b. group -> if toggle === "year", filter by year else... 

    // 3. display using your external library/component
    
    return (
        <div className="card w-11/12 h-2/5 shadow-xl bg-sky-600">
            AnalyticsHeatmap
            toggled by: {toggle}
            filter time start: {filterValue.start} time end: {filterValue.end}
        </div>
    );
}

export default AnalyticsHeatmap;