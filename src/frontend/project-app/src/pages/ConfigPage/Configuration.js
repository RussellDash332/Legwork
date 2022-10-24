import React, { useState } from "react";
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
    return (
        <FlowContextProvider>
            <div className="h-screen bg-base-200 flex flex-col">

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