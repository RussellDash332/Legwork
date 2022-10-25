import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkUserState } from "../api/firebase-auth";

export const UserContext = createContext();

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

    return (
        <UserContext.Provider
            value={{
                user
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default ProtectedRoute;