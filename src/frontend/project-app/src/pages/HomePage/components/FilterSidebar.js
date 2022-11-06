import React from "react";

const FilterSidebar = () => {
    return (
        
        <>
            

            <div className="drawer-side absolute top-0 right-70 w-1/4 h-screen overflow-x-hidden " >
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-full bg-base-100 text-base-content content-center">
                    <div className="text-4xl underline underline-offset-8 top-0"><p> Filters </p>
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
                        <input type="radio" name="options" data-title="month" className="btn" onClick={() => updateFilterToggle("year_month")} />
                        <input type="radio" name="options" data-title="day" className="btn" onClick={() => updateFilterToggle("year_month_day")}/>
                    </div>
                </ul>     
            </div>
        </>
    );
}

export default FilterSidebar;