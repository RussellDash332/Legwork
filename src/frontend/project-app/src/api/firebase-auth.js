import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase-config";
import { storeNewUser } from "./firebase-db";

export const createAccount = (username, email, password, success, failure) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateProfile(user, {displayName: username}); // Add username to profile
      storeNewUser(user.uid, user.email); // Add user to database
      return success();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      let message = "";

        if (error.code === 'auth/email-already-in-use') {
            message = "Email Already In-use. Please use another email.";
        };
        if (error.code === 'auth/invalid-email') {

            message = "Invalid Email. Please ensure that the email you've entered is valid.";
        };
        if (error.code === 'auth/operation-not-allowed') {
            message = "Account creation is disabled at the moment. Please try again after a moment.";
        };
        if (error.code === 'auth/weak-password') {
            message = "Weak Password. Password should be at least 6 characters.";
        }; 
        if (error.code === 'auth/internal-error') {
            message = "Missing fields. Check your email or passwords.";
        };

      return failure(errorCode, errorMessage, message);
    });
}


export const loginAccount = (email, password, success, failure) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return success();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      let message = "";

        if (error.code === 'auth/invalid-email') {
            message = "Invalid Email. Please ensure that the email you've entered is valid."
        }

        if (error.code === 'auth/user-not-found') {
            message = "User Not Found. Please ensure that you have an account associated with the email."
        };

        if (error.code === 'auth/wrong-password'){
            message = "Incorrect Password. The password you entered is incorrect."
        };

      return failure(errorCode, errorMessage, message);
    });
}

export const checkUserState = (success) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("firebase auth user:");
        console.log(user);

        // user can be user-object (success) or undefined (failure)
        success(user);
        });

    // return unsubscribe function
    return unsubscribe;
} 

export const logoutAccount = (success, failure) => {
    signOut(auth).then(() => {
        // Sign-out successful.
        return success();
      }).catch((error) => {
        // An error happened.
        return failure();
      });
}
