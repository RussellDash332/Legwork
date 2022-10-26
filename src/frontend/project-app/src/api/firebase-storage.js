import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
// import { storage } from "./firebase-config";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

/**
 * Function to store floorplan in firestore under user
 * @param {String} uid 
 * @param {String:url} img_url 
 * @param {Function} success 
 */
export const storeFloorplanImage = async (uid, img_url, success) => {
    // Create a storage reference from our storage service
    const storageRef = ref(storage, `floorplan/${uid}/${uid}.jpg`);

    try {
        const reponse = await fetch(img_url);
        const file = await reponse.blob();

        uploadBytes(storageRef, file)
        .then((snapshot) => {
            console.log('floorplan uploaded successfully');

            return success();
        })
    } catch (error) {
        console.log("failed to save floorplan url  :", error)
    }

}

export const getFloorplanImage = (uid, success) => {
    const imgRef = ref(storage, `floorplan/${uid}/${uid}.jpg`);

    getDownloadURL(imgRef)
    .then((url) => {
        const img_data = {
            data_url: url,
            file: {
                size: 0
            }
        }

        console.log("image retrieved:", img_data);
        return success(img_data)
    })
    .catch((error) => {
        console.log(error);
        if (error.code === 'storage/object-not-found') {
            const img_data = {};
            return success(img_data);
        }
    })
}