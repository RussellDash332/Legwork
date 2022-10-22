import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosSave } from "react-icons/io"
import { ReactFlowProvider } from "reactflow";

import { FlowContextProvider } from "./components/FlowComponent/FlowContext";
import HelpConfig from "./components/HelpComponent/HelpConfig";
import LayerControl from "./components/LayerComponent/LayerControl";
import ScaleControl from './components/ScaleComponent/ScaleControl';
import NodeControl from "./components/NodeComponent/NodeControl";
import Flow from './components/FlowComponent/Flow';


const Configuration = () => {
    /* Navigation & Data */
    const navigate = useNavigate();
    const [saveToggle, setSaveToggle] = useState(false);
    const [quitToggle, setQuitToggle] = useState(false);

    const clickSave = () => {
        setSaveToggle(true);
    }

    const clickSaveQuit = () => {
        setSaveToggle(true);
        setQuitToggle(true);
    }

    useEffect(() => {
        if (saveToggle) {
            // Store changes to database
            setTimeout(() => {
                setSaveToggle(false);

                if (quitToggle) {
                    setQuitToggle(false);
                    navigate("/home")
                }
            }, 2000);
        }
    }, [saveToggle])

    /* Layer Control */

    /* Scale Control */
    const [scale, setScale] = useState(50);

    return (
        <FlowContextProvider>
            <div className="h-screen bg-base-200 flex flex-col">

                {/* Nav Bar */}
                <div className="navbar bg-gray-700 text-white">
                {/* Left Components */}
                <div className="flex-1 place-items-center">

                    {/* <div className="sidebar-icon group">
                        <IoIosArrowBack className="h-8 w-8" />
                        <span className="sidebar-tooltip group-hover:scale-100">
                            Profile
                        </span>
                    </div> */}

                    <div className="px-2">
                        <IoIosArrowBack className="text-2xl"/>
                    </div>

                    <a className="normal-case text-2xl font-bold">
                        Configuration
                    </a>

                    <div className="px-2">
                        <a href="#helpConfig">
                            <AiFillQuestionCircle className="btn btn-circle btn-xs" />
                        </a>
                    </div>
                </div>

                {/* Right Components */}
                <div className="flex-none">
                    <button className={(saveToggle && !quitToggle) ? "btn btn-primary btn-outline btn-sm mx-2 loading" : "btn btn-primary btn-outline btn-sm mx-2"} 
                        onClick={clickSave}
                        disabled={quitToggle}>
                        <IoIosSave className="h-6 w-6"/>
                        Save
                    </button>

                    <button className={(saveToggle && quitToggle) ? "btn btn-primary btn-sm gap-2 loading" :"btn btn-primary btn-sm gap-2"}
                        onClick={clickSaveQuit}
                        disabled={(saveToggle && !quitToggle)}>
                        <IoIosSave className="h-6 w-6"/>
                        Save & Quit
                    </button>

                    

                </div>
                </div>

                <div className="h-full bg-green-100" style={{borderColor: 'red', borderWidth: '3'}}>
                    <ReactFlowProvider>
                        <Flow scale={scale}/>
                    </ReactFlowProvider>
                </div>

                {/* Bg Layers */}
                <LayerControl/>

                {/* Component Scale */}
                <ScaleControl scale={scale} setScale={setScale}/>

                {/* Add & Components button */}
                <NodeControl />

                {/* Help Configuration */}
                <HelpConfig />

            </div>
            </FlowContextProvider>
    );
}

export default Configuration;