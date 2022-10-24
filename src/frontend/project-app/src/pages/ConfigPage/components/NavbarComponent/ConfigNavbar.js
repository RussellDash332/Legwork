import React, { useContext, useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import { storeUserNodes, updateNodeScale } from "../../../../api/firebase-db";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosSave } from "react-icons/io"
import FlowContext from "../FlowComponent/FlowContext";
import { UserContext } from "../../../ProtectedRoute";


import HelpConfig from "../HelpComponent/HelpConfig";

const ConfigNavbar = () => {

    const { nodes, edges, scale} = useContext(FlowContext);
    const { user } = useContext(UserContext);

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
            console.log("Save button");
            console.log(user.uid);
            console.log(nodes);
            console.log(edges);
            
            storeUserNodes(user.uid, nodes, edges,
                () => {
                    setSaveToggle(false);

                    if (quitToggle) {
                        setQuitToggle(false);
                        navigate("/home")
                    }
                }    
            )

            updateNodeScale(user.uid, scale);

            

            // setTimeout(() => {
            //     setSaveToggle(false);

            //         if (quitToggle) {
            //             setQuitToggle(false);
            //             navigate("/home")
            //         }
            // }, 2000)

        }
    }, [saveToggle])

    return (
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
    );
}

export default ConfigNavbar;