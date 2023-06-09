import React,{createContext, useEffect, useReducer} from 'react';
import {userReducer} from '../reducers/userReducer';


export const INITIAL_STATE = {
    currentUser:JSON.parse(localStorage.getItem('user')) || null,
}

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({children}) => {
    const [state, dispatchUser] = useReducer(userReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.currentUser))
    }, [state.currentUser])
    return (
        <UserContext.Provider value={{currentUser:state.currentUser, dispatchUser}}>
            {children}
        </UserContext.Provider>
    )
}