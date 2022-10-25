import React from "react";
// import DateRangeComp from "./DateRangeComp";
import TimeRangeSlider from "react-time-range-slider";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
// import format from "date-fns/format";
// import { addDays } from "date-fns";

import "./Filter.css";

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const FilterSidebar = ({filterValue, setFilterValue, range, setRange, setToggle}) => {

    //hirarechy of components
    // analytics tab
    // - filter sidebar, heatmap, linegraph
    // - daterangecomponent, timerangecomponent, toggles
    // - daterangecomponent

    // TimeRangeComp functions

    const changeStartHandler = (time) => {
        console.log("Start Handler Called", time);
    }

    const timeChangeHandler = (time) => {
        setFilterValue(time);
    }

    const changeCompleteHandler = (time) => {
        console.log("Complete Handler Called", time);
    }

    // DateRangeComp functions

    // const [range, setRange] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: addDays(new Date(), 7),
    //         key: 'selection'

    //     }
    // ]) 

    //open close
    const [open, setOpen] = useState(false)

    //get the target element to toggle
    const refOne = useRef(null)

    useEffect(() => {
        // set current date on component load
        
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    },[])

    const hideOnEscape = (e) => {
        console.log(e.key)
        if( e.key === "Escape"){
            setOpen(false)
        }
    }

    const hideOnClickOutside = (e) => {
        if( refOne.current && !refOne.current.contains(e.target) ){
            setOpen(false)
        }
    }

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Filter</label>
            </div>

            <div className="drawer-side absolute top-0 right-0 w-2/5 h-screen" >
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-full bg-base-100 text-base-content">

                    <div classname="calendarWrap">
                        <h4>Date Range</h4>
                        <input
                            // value = {` ${format(""range[0].startDate"", "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")} ` }
                            value = {` ${"01/01/1999"} to ${"12/30/2022"} ` }
                            readOnly
                            className = "inputBox"
                            onClick={ () => setOpen(open => !open) }
                        />    

                        <div ref={refOne}>
                        {open &&
                        <DateRange
                            onChange = {item => setRange([item.selection])}
                            editableDateInputs = {true}
                            moveRangeOnFirstSelection = {false}
                            ranges = {range}
                            months = {2}
                            direction = "vertical"
                            className = "calendarElement"
                            />
                        }
                        </div>

                        <br /><br />
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
                            step={10}
                            value={filterValue}/>
                        <div>Start Time: {filterValue.start} End Time: {filterValue.end}</div>
                        <hr />
                    </div>
                    <br /><br />
                    <br /><br />
                    <div className="btn-group btn-group-horizontal w-full" >
                        <button className="yearbutton w-1/3" onClick={() => setToggle("year")}>
                            <label tabIndex={0} className="btn m-1">Year</label>
                        </button>    
                        <button className="monthbutton w-1/3" onClick={() => setToggle("month")}>
                            <label tabIndex={0} className="btn m-1">Month</label>
                        </button>
                        <button className="daybutton w-1/3" onClick={() => setToggle("day")}>
                        <label tabIndex={0} className="btn m-1">Day</label>
                        </button>
                    </div>
                </ul>     
            </div>
        </div>
    );
}

export default FilterSidebar;