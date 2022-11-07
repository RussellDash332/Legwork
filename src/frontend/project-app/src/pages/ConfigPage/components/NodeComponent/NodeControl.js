import React from "react";
import { IoIosAdd, IoIosApps } from "react-icons/io"

import AddNode from './AddNode';
import AddPath from './AddPath';
import AddSpot from './AddSpot';
import ViewNode from './ViewNode';

const NodeControl = () => {
    return (
        <div className="flex flex-row w-28 absolute bottom-4 right-4 justify-between z-10">
            <div>
                <label htmlFor="addNode" className="btn btn-circle btn-primary btn-md shadow-xl text-white">
                    <IoIosAdd className="h-6 w-6"/>
                </label>
            </div>
            
            <div>
                <label htmlFor="viewNode" className="btn btn-circle btn-primary btn-md shadow-xl text-white">
                    <IoIosApps className="h-6 w-6"/>
                </label>
            </div>



            {/* Popout Modals */}
            <AddNode />
                <AddPath />
                <AddSpot />
            <ViewNode />
        </div>
    );
}

export default NodeControl;