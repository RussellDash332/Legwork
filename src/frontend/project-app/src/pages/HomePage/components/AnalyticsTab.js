import AnalyticsHeatmap from "./AnalyticsHeatmap";
import AnalyticsLineGraph from "./AnalyticsLineGraph";
import NewFilterSideBar from "./NewFilterSideBar";

const AnalyticsTab = () => {

 

    return (
        <NewFilterSideBar className="no-scrollbar">
        <div className="flex flex-col overflow-hidden h-fit w-full bg-base-200">
            <br></br>
            <div className="pb-6 flex flex-col justify-evenly items-center overflow-scroll no-scrollbar h-full w-full">
                
                <AnalyticsHeatmap />
                <br></br>
                <AnalyticsLineGraph />
                
            </div>
        
        </div>
        </NewFilterSideBar>
    );
}

export default AnalyticsTab;