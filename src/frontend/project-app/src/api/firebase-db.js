import { ref, set, child, get, getDatabase } from "firebase/database";
// import { database } from "./firebase-config";

const dbRef = ref(getDatabase())

/**
 * Function to initialise a new user in the database
 * @param {String} uid 
 * @param {String} email 
 */
export const storeNewUser = (uid, email) => {
    const db = getDatabase();
    set(ref(db, 'users/' + uid), {
        uid: uid,
        floorplanURL: ""
    })
    .then(() => {
        console.log("user stored in db successfully")
    })
    .catch((error) => {
        console("db error failed to save : ", error)
    })
}

/**
 * Function to store Flow Component state in database under user
 * @param {String} uid 
 * @param {Array} nodes 
 * @param {Array} edges 
 * @param {Function} success 
 */
export const storeUserNodes = (uid, nodes, edges, success) => {
    const db = getDatabase();
    set(ref(db, 'users/' + uid + '/flow'), {
        nodes: nodes,
        edges: edges
    }).then(() => {
        console.log("flow data stored in db successfully")

        return success();
    })
    .catch((error) => {
        console("failed to save flow data ", error)
    })
}

/**
 * Function to retrieve Flow Component state in databse under user
 * @param {String} uid 
 * @param {Function} success 
 */
export const getUserNodes = (uid, success) => {
    get(child(dbRef, `users/${uid}/flow`))
    .then((snapshot) => {

        if (snapshot.exists()) {
            console.log(snapshot.val());
        }

        return success(snapshot.val());
    })
    .catch((error) => {
        console.log(error);
    })
}








export const getUserData = (uid, success) => {
    get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return success(snapshot)
        }
    })
    .catch((error) => {
        console.log(error);
    })
}