import React from "react";
import DateRangeComp from "./DateRangeComp";


const FilterSidebar = () => {
    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Filter</label>
            </div>
            <div className="drawer-side absolute top-0 right-0" >
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-120 bg-base-100 text-base-content">

                    <div classname="DateRangeComp">
                        <h4>Date Range</h4>
                        <DateRangeComp />

                        <br /><br />
                        <hr />

                    </div>

                    <li><a><div className="dropdown">
                        <label tabIndex={0} className="btn m-1">Year</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">2019</span>
                                    <input type="checkbox" checked className="checkbox checkbox-primary" />
                                </label>
                            </div></li>
                            <li><div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">2020</span>
                                    <input type="checkbox" checked className="checkbox checkbox-primary" />
                                </label>
                            </div></li>
                        </ul>
                    </div></a></li>

                    <li><a><div className="dropdown">
                        <label tabIndex={0} className="btn m-1">Month</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">January</span>
                                    <input type="checkbox" checked className="checkbox checkbox-primary" />
                                </label>
                            </div></li>
                            <li><div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">February</span>
                                    <input type="checkbox" checked className="checkbox checkbox-primary" />
                                </label>
                            </div></li>
                        </ul>
                    </div></a></li>

                    <li><a><div className="dropdown">
                        <label tabIndex={0} className="btn m-1">Day</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Monday</span>
                                    <input type="checkbox" checked className="checkbox checkbox-primary" />
                                </label>
                            </div></li>
                            <li><div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Tuesday</span>
                                    <input type="checkbox" checked className="checkbox checkbox-primary" />
                                </label>
                            </div></li>
                        </ul>
                    </div></a></li>


                    <div date-rangepicker="" class="flex items-center">
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input name="start" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date start" />
                        </div>
                        <span class="mx-4 text-gray-500">to</span>
                        <div class="relative">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input name="end" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 datepicker-input" placeholder="Select date end" />
                        </div>
                    </div>

                        {/* <div>
    const [start, startRef] = React.useState(null);
    const [end, endRef] = React.useState(null);
                    
    <Datepicker
        controls={['datetime']}
        select="range"
        startInput={start}
        endInput={end}
        touchUi={true}
        />
    <Input
        ref={startRef}
        placeholder="Please Select...">Start
        </Input>
    <Input
        ref={endRef}
        placeholder="Please Select...">End
    </Input>
    </div> */}


                        {/* <div>
    <input type="text" name="daterange" value="01/01/2018 - 01/15/2018" />

    
    (function() {
        ('input[name="daterange"]').daterangepicker({
            opens: 'left'
            }, function(start, end, label) {
                console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
                })
        });
    
    </div> */}
                </ul>
            </div>

        </div>
    );
}

export default FilterSidebar;