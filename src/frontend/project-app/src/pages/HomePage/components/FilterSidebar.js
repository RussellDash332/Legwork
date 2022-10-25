import React from "react";
import DateRangeComp from "./DateRangeComp";
import TimeRangeSlider from "react-time-range-slider";


const FilterSidebar = ({filterValue, setFilterValue, setToggle}) => {

    //hirarechy of components
    // analytics tab
    // - filter sidebar, heatmap, linegraph
    // - daterangecomponent, timerangecomponent, toggles
    // - daterangecomponent

    const changeStartHandler = (time) => {
        console.log("Start Handler Called", time);
    }

    const timeChangeHandler = (time) => {
        setFilterValue(time);
    }

    const changeCompleteHandler = (time) => {
        console.log("Complete Handler Called", time);
    }

    // daterange comp functions

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Filter</label>
            </div>

            <div className="drawer-side absolute top-0 right-0 w-2/5 h-screen" >
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-full bg-base-100 text-base-content">

                    <div classname="DateRangeComp">
                        <h4>Date Range</h4>
                        <DateRangeComp />

                        <br /><br />
                        <hr />

                    </div>

                    <div classname="TimeRangeSlider">
                        <h4>Time Range</h4>
                        <TimeRangeSlider
                            disabled={false}
                            format={24}
                            maxValue={"23:59"}
                            minValue={"00:00"}
                            name={"time_range"}
                            onChangeStart={changeStartHandler}
                            onChangeComplete={changeCompleteHandler}
                            onChange={timeChangeHandler}
                            step={15}
                            value={filterValue}/>
                        <div>Start Time: {filterValue.start} End Time: {filterValue.end}</div>
                        <hr />
                    </div>

                    <a><div className="dropdown" onClick={() => setToggle("year")}>
                        <label tabIndex={0} className="btn m-1">Year</label>
                    </div></a>
                    <a><div className="dropdown" onClick={() => setToggle("month")}>
                        <label tabIndex={0} className="btn m-1">Month</label>
                    </div></a>
                    <a><div className="dropdown" onClick={() => setToggle("day")}>
                        <label tabIndex={0} className="btn m-1">Day</label>
                    </div></a>
                </ul>     
            </div>
        </div>
    );
}

export default FilterSidebar;