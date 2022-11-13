import React, { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";

import { FlowContextProvider } from "./components/FlowComponent/FlowContext";
import ConfigNavbar from "./components/NavbarComponent/ConfigNavbar";
import HelpConfig from "./components/HelpComponent/HelpConfig";
import LayerControl from "./components/LayerComponent/LayerControl";
import UploadFloorplan from "./components/LayerComponent/UploadFloorplan";
import ScaleControl from './components/ScaleComponent/ScaleControl';
import NodeControl from "./components/NodeComponent/NodeControl";
import Flow from './components/FlowComponent/Flow';


const Configuration = () => {

    const beforeUnloadHandler = (event) => {
        const e = event || window.event;
        e.preventDefault();

        if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
            }
        return ''; // Legacy method for cross browser support
    }

    useEffect(() => {
        window.removeEventListener('beforeunload', beforeUnloadHandler, true);
        window.addEventListener('beforeunload', beforeUnloadHandler, true);

        return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler, true);
        };
    }, [])   

    return (
        <FlowContextProvider>
            <div className="h-screen flex flex-col">

                {/* Nav Bar */}
                <ConfigNavbar />
                    <HelpConfig />

                {/* Flow diagram compoenent */}
                <div className="h-full">
                    <ReactFlowProvider>
                        <Flow />
                    </ReactFlowProvider>
                </div>

                {/* Bg Layers */}
                <LayerControl />
                    <UploadFloorplan />

                {/* Component Scale */}
                <ScaleControl />

                {/* Add & Components button */}
                <NodeControl />

            </div>
        </FlowContextProvider>
    );
}

export default Configuration;