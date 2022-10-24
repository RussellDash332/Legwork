import React, { useContext, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { UserContext } from "../../../ProtectedRoute";
import FlowContext from "../FlowComponent/FlowContext";
import { storeFloorplanImage } from "../../../../api/firebase-storage";
// import { BiImageAdd} from "react-icons/bi"

const UploadFloorplan = () => {
    const { user } = useContext(UserContext);
    const { floorplanImage, setFloorplanImage } = useContext(FlowContext);
    const [submitToggle, setSubmitToggle] = useState(false);

    useEffect(() => {
        if (submitToggle) {
            if (floorplanImage.length !== 0) {
                storeFloorplanImage(user.uid,
                    floorplanImage[0].data_url,
                    () => {
                        setSubmitToggle(false);
                        document.getElementById("close-uploadFloorplan").click();
                    }
                );
            }
        }
    }, [submitToggle])

    const clickSubmit = () => {
        setSubmitToggle(true);
    }

    const onUpload = (imageList, addUpdateIndex) => {
        console.log(imageList);
        console.log(imageList[0].file);
        setFloorplanImage(imageList);
    }

    return (
        <div className="modal" id="uploadFloorplan">
        <div className="modal-box max-w-min no-scrollbar">
            {/* Close button */}
            <a id="close-uploadFloorplan" href="#"/>
            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</a>

            {/* Title */}
            <div className="form-control mb-2">
                <h3 className="font-bold text-2xl">Upload Floorplan</h3>
            </div>

            <hr className="h-1 text-primary bg-primary mb-4"/>

            {/* Content */}
            <div className="w-[500px]">

                <ImageUploading
                    value={floorplanImage}
                    onChange={onUpload}
                    multiple={false}
                    maxNumber={1}
                    dataURLKey="data_url"
                    acceptType={["jpg", "jpeg", "png"]}
                    onError={(error, files) => console.log(error)}
                >
                    {({ onImageUpload, onImageUpdate, onImageRemove, imageList, isDragging, dragProps }) => (
                        <div>
                            {/* Browse */}
                            <div className="flex mb-4">
                                <div>
                                    <h2>Your file</h2>
                                </div>
                                <div className="upload__image-wrapper">
                                    <button className="btn btn-primary mx-5"
                                        disabled={submitToggle}
                                        onClick={(floorplanImage.length !== 0) ? () => onImageUpdate(0) : onImageUpload}>
                                        Browse
                                    </button>
                                </div>

                                <div className="w-48 flex items-center">
                                    <p className="text-xs text-ellipsis">Only '.jpg', '.jpeg', '.png' extensions allowed</p>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="flex">
                                <div className="bg-base-300 aspect-[150/65] h-40 rounded-md flex justify-center items-center"
                                    // {...dragProps}
                                >
                                    {(floorplanImage.length === 0)
                                    ? <p>(No Image Uploaded)</p>
                                    : <div>
                                        <img src={floorplanImage[0].data_url} className="object-contain aspect-[150/65] h-36" />
                                    </div>}
                                    
                                    {/* {(isDragging)
                                        && <div className="aspect-[150/65] h-[120px] rounded-md absolute border-dashed border-2 border-base-100 flex justify-center" {...dragProps}>
                                            <BiImageAdd className="self-center w-10 h-10"/>
                                        </div>} */}
                                </div>

                                {(floorplanImage.length !== 0) &&
                                <div className="flex flex-col justify-between">
                                    <button className="btn btn-sm btn-circle btn-ghost" disabled={submitToggle} onClick={() => onImageRemove(0)}>✕</button>
                                    <p className="text-xs text-ellipsis ml-2">({floorplanImage[0].file.size.toLocaleString()} kb)</p>
                                </div>}
                                
                            </div>
                        </div>
                    )}
                </ImageUploading>

                {/* Submit */}
                <div className="flex justify-center pt-5">
                    <button className={(submitToggle) ? "btn btn-primary loading" : "btn btn-primary"} onClick={clickSubmit}>Submit</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default UploadFloorplan;