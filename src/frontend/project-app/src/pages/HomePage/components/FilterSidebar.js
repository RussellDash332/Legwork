import React from "react";
import DateRangeComp from "./DateRangeComp";
// import TimeRangeSlider from "./TimeRangeSlider";
import TimeRangeSlider from "react-time-range-slider";


const FilterSidebar = () => {
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

                    {/* <div classname="TimeRangeSlider"> */}
                    <div id="TimeRangeSlider">
                        <h4>Time Range</h4>
                        <TimeRangeSlider
                            disabled={false}
                            format={24}
                            maxValue={100}
                            minValue={0}
                            name={"time_range"}
                        
                            step={15}
                            value={10}/>

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
                </ul>
            </div>

        </div>
    );
}

export default FilterSidebar;