import React from "react";
import TimeRangeSlider from "react-time-range-slider";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
// import { FiFilter } from "react-icons/fi";

import Data from "./Data.js";
import "./Filter.css";

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const FilterSidebar = () => {

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

    //from ---------------------------------
    const [data, setData] = useState({});
    const [filteredData, setFilteredData] = useState({});
    const [dateRange, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [timeRange, setTimeRange] = useState({
        start: "00:00",
        end: "23:59"
    });
    const [filterGroupToggle, setFilterGroupToggle] = useState("day_month_year");
    const findSmallestDate = (inputData) => {
        let smallestTimeStamp = Infinity;

        Object.values(inputData.cameraLog).forEach(obj => {
            
            if(obj.timestamp < smallestTimeStamp){
                smallestTimeStamp = obj.timestamp
                // console.log(smallestTimeStamp)
            }

        })
        console.log(new Date(smallestTimeStamp*1000))
        return new Date(smallestTimeStamp*1000);
    };
    const formatTimestamp = (dataPoint) => {
        const timestamp = dataPoint['timestamp'] 
        const date = new Date(timestamp) //Tue Jan 20 1970 14:22:45 GMT+0730 (Singapore Standard Time)
        
        dataPoint['startDate'] = dateRange[0].startDate
        dataPoint['endDate'] = dateRange[0].endDate
        dataPoint['time'] =  date.getHours() + ":" + date.getMinutes()
        dataPoint['year'] = new Date(timestamp*1000).getFullYear()
        dataPoint['month_year'] = String(new Date(timestamp*1000).getMonth()) + "/" + String(new Date(timestamp*1000).getFullYear())
        dataPoint['day_month_year'] = String(new Date(timestamp*1000).getDay()) + "/" + String(new Date(timestamp*1000).getMonth()) + "/" + String(new Date(timestamp*1000).getFullYear())

        return dataPoint;
    };
    const aggregateByCameraId = (prev, current, index) => {
 
        if (!(current["camera_id"] in prev)) {
          console.log("reset")
          prev[current["camera_id"]] = {}
        }

        const key = current[filterGroupToggle]
        if (!(key in prev[current["camera_id"]])) {
          console.log("reset key")
          prev[current["camera_id"]][key] = 0;
        }
        
        const temp = prev[current["camera_id"]][key]
        prev[current["camera_id"]][key] += current["count"]
        console.log("diff", temp, prev[current["camera_id"]][key] - temp)

        return prev;
    };
    const stringToTime = (str) => {
        const strArray = str.split(':')
        const hourStr = strArray[0]
        const hour = parseInt(hourStr) 
        const minuteStr = strArray[1]
        const minute = parseInt(minuteStr) 

        return hour*60 + minute;
    };

    const checkValidRange = (dataPoint) => {
        const startDate = dateRange[0].startDate
        const endDate = dateRange[0].endDate    
        const time = dataPoint['time']
        const timestamp = dataPoint['timestamp']
        const calendarDate = String(new Date(timestamp*1000).getDay()) + 
            "/" + String(new Date(timestamp*1000).getMonth()) +
            "/" + String(new Date(timestamp*1000).getFullYear())

        const tempStartDate = new Date(startDate)
        const tempEndDate = new Date(endDate)
        const tempCalendarDate = new Date(calendarDate)
        // console.log(timestamp)
        // console.log(stringToTime(time))
        // console.log("str", stringToTime(timeRange.end))
        // console.log(tempStartDate <= tempCalendarDate)
        // console.log(tempStartDate)
        // console.log("tempEndDate")
        // console.log(tempEndDate)
        // console.log("tempCalendarDate")
        // console.log(tempCalendarDate)
        // console.log("tempStartDate <= tempCalendarDate")
        // console.log(tempStartDate <= tempCalendarDate)
        // console.log("tempCalendarDate <= tempEndDate")
        // console.log(tempCalendarDate <= tempEndDate)
        // console.log(tempStartDate <= tempCalendarDate && tempCalendarDate <= tempEndDate )
        // console.log("timeRange.start <= time")
        // console.log(timeRange.start <= time)
        // console.log("timeRange.start <= time")
        // console.log(timeRange.start <= time)
        // console.log("time <= timeRange.end")
        // console.log(time <= timeRange.end)
    
        return tempStartDate <= tempCalendarDate && tempCalendarDate <= tempEndDate && stringToTime(timeRange.start) <= stringToTime(time) && stringToTime(time) <= stringToTime(timeRange.end);
    };

    const processData = (data) => {

        console.log("raw data")
        console.log(Data.hasOwnProperty("cameraLog"))
        // flatten data into entries
        let flattened_data = []
        // Object.values(data).forEach(user => {
            Object.values(data.cameraLog).forEach(dataPoint => {
                flattened_data.push(dataPoint);
            }) 
        // })
    
        // output the number of items that pass the range
        console.log("initial data")
        console.log(flattened_data)

        // 1. filter out values that dont have timestamp
        const flattened_data1 = flattened_data.filter(x => x.hasOwnProperty('timestamp'))
        console.log("filtering data")
        console.log(flattened_data1)
    
        // 2. format timestamps
        const flattened_data2 = flattened_data1.map(formatTimestamp)
        console.log("mapping data")
        console.log(flattened_data2)
    
        // 3. check if timestamp is within the range
        const flattened_data3 = flattened_data2.filter(checkValidRange)
        console.log("validrange data")
        console.log(flattened_data3)
        
        console.log("checkvalidrange", checkValidRange(flattened_data2[0]))

        // 4. aggregate by camera_id, year
        const flattened_data4 = flattened_data3.reduce(aggregateByCameraId, {})
        console.log("aggre data")
        console.log(flattened_data4)
    
        return flattened_data4;
    };

    useEffect(() => {
        setData(Data)
        //find the smallest date and replace startDate
        setRange([{
            startDate: findSmallestDate(Data),
                endDate: new Date(),
                key: 'selection'
            }])
    }, []);

    useEffect(() => {
        // setFilteredData(formatFilteredData(data))
        console.log("testingdata", data)
    }, [data]);

    useEffect(() => {
        if(data.hasOwnProperty("cameraLog")){
            const pdata = processData(data)
            console.log("processdata",pdata)
            setFilteredData(pdata)
        }   
    }, [timeRange, dateRange, filterGroupToggle]);
    
    // -----------------------------------

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