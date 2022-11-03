import React from "react";
import LiveHeatmap from "./LiveHeatmap"

const LiveTab = () => {
    return (
        <div className="flex flex-col justify-evenly items-center h-full w-full bg-base-200 no-scrollbar">
            <LiveHeatmap />
        </div>
    );
}

export default LiveTab;