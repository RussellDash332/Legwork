import React from "react";

const AnalyticsLineGraph = ({filterValue, toggle}) => {
    return (
        <div className="card w-2/3 h-2/5 shadow-xl bg-orange-400">
            AnalyticsLineGraph
            toggled by: {toggle}
        </div>
    );
}

export default AnalyticsLineGraph;