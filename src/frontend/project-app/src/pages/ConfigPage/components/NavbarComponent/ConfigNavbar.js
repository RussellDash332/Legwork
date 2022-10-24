import React, { useContext, useEffect, useState }from "react";
import { useNavigate } from "react-router-dom";
import { storeUserNodes, updateNodeScale } from "../../../../api/firebase-db";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoMdExit, IoIosSave } from "react-icons/io"
import FlowContext from "../FlowComponent/FlowContext";
import { UserContext } from "../../../ProtectedRoute";

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

        }
    }, [saveToggle])

    return (
        <div className="fixed top-0 w-screen h-16 z-10
            flex justify-between bg-base-300">

            {/* Left Components */}
            <div className="flex place-items-center">
                <a className="normal-case text-2xl font-bold pl-5">
                    Configuration
                </a>

                <div className="px-2">
                    <a href="#helpConfig">
                        <AiFillQuestionCircle className="btn btn-circle btn-xs" />
                    </a>
                </div>
            </div>

            {/* Right Components */}
            <div className="flex w-32 mr-2">
                {/* <button className={(saveToggle && !quitToggle) ? "btn btn-primary btn-outline btn-sm mx-2 loading" : "btn btn-primary btn-outline btn-sm mx-2"} 
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
                </button> */}

                <div className="sidebar-icon group" onClick={clickSave} disabled={quitToggle}>
                    <IoIosSave className="h-8 w-8" />
                    <span className="sidebar-tooltip2 group-hover:scale-100">
                        Save
                    </span>
                </div>

                <div className="sidebar-icon group" onClick={clickSaveQuit} disabled={(saveToggle && !quitToggle)}>
                    <IoMdExit className="h-8 w-8" />
                    <span className="sidebar-tooltip2 group-hover:scale-100">
                        Save & Quit
                    </span>
                </div>

            </div>

        </div>
    );
}

export default ConfigNavbar;