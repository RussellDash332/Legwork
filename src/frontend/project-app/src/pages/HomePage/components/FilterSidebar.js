import React, { useContext } from "react";
import TimeRangeSlider from "react-time-range-slider";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
// import { FiFilter } from "react-icons/fi";

import Data from "./Data.js";
import "./Filter.css";

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

import CameraDataContext from "./CameraDataContext.js";

const FilterSidebar = () => {
    const {
        filteredData,
        dateRange, setRange,
        timeRange, setTimeRange,
        filterGroupToggle, setFilterGroupToggle
    } = useContext(CameraDataContext);

    const changeStartHandler = (time) => {
        console.log("Start Handler Called", time);
    }

    const timeChangeHandler = (time) => {
        setTimeRange(time);
    }

    const changeCompleteHandler = (time) => {
        console.log("Complete Handler Called", time);
    }

    //open close
    const [open, setOpen] = useState(false);

    //get the target element to toggle
    const refOne = useRef(null);

    const hideOnEscape = (e) => {
        console.log(e.key)
        if( e.key === "Escape"){
            setOpen(false)
        }
    };

    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ){
            setOpen(false)
        }
    };

    // to toggle 'year' if no existing filter or 
    // untoggle 'year' if its filtered by year and to 
    const updateFilterToggle = (value) => {
        setFilterGroupToggle(value);
    };

    useEffect(() => {
        // set current date on component load
        
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    },[]);

    return (
        
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Filter</label>
            </div>

            <div className="drawer-side absolute top-0 right-70 w-1/4 h-screen" >
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-full bg-base-100 text-base-content content-center">
                    <div className="text-5xl underline underline-offset-8 top-0"><p> Filters </p>
                    </div>
                    <br /><br />
                    
                    <div className="calendarWrap">
                        <h4>Date Range</h4>
                        <input
                            value = {` ${format(dateRange[0].startDate, "MM/dd/yyyy")} to ${format(dateRange[0].endDate, "MM/dd/yyyy")} ` }
                            readOnly
                            className = "inputBox"
                            onClick={ () => setOpen(open => !open) }
                        />    

                        <div ref={refOne}>
                        {open &&
                        <DateRange
                            onChange = {item => {
                                setRange(prevState => [item.selection]);
                                console.log(item.selection)

                            }}
                            editableDateInputs = {true}
                            moveRangeOnFirstSelection = {false}
                            ranges = {dateRange}
                            months = {2}
                            direction = "vertical"
                            className = "calendarElement"
                            />
                        }
                        </div>

                        <br /><br />
                    </div>
                    <br /><br />
                    {/* <br /><br /> */}


                    <div className="TimeRangeSlider card w-full px-7 py-5 bg-base-200 flex flex-col space-y-4 ">
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
                            step={10}
                            value={timeRange}/>
                        <div>Start Time: {timeRange.start}   End Time: {timeRange.end}</div>
                    
                    </div>
                    <br /><br />
                    {/* <br /><br /> */}

                    <div className="btn-group btn-group-horizontal justify-center w-full flex space-x-4 card px-7 py-5 bg-base-200 ">
                        <input type="radio" name="options" data-title="year" className="btn" onClick={() => updateFilterToggle("year")} />
                        <input type="radio" name="options" data-title="month" className="btn" onClick={() => updateFilterToggle("month_year")} />
                        <input type="radio" name="options" data-title="day" className="btn" onClick={() => updateFilterToggle("day_month_year")}/>
                    </div>
                </ul>     
            </div>
        </div>
    );
}

export default FilterSidebar;