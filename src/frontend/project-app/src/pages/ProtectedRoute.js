import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkUserState } from "../api/firebase-auth";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = checkUserState((user) => {
            setUser(user);
        });

        return unsubscribe();
    }, [])
    
    useEffect(() => {
        console.log("protected route user:")
        console.log(user);
    }, [user])

    if (!user) {
        return (
            <Navigate to='/login' />
        );
    }

    return children;
}

export default ProtectedRoute;