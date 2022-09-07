import {createContext, useReducer, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../config/firebase';

import Loader from '../components/Loader';

export const AuthContext = createContext();

const initState = {
    authStateLoading: true,
    user: null
}

const authReducer = (state=initState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            // set the user
            return {...state, user: action.payload};
        case 'LOGOUT_SUCCESS':
            // remove the user
            return {...state, user: null};
        case 'INITIAL_AUTH_CHECK_SUCCESS':
            return {...state, authStateLoading: false, user: action.payload};
        case 'INITIAL_AUTH_CHECK_FAIL':
            return {...state, authStateLoading: false, user: null};
        default:
            return state;
    }
}

const AuthProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, initState);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user) {
                dispatch({
                    type: 'INITIAL_AUTH_CHECK_SUCCESS',
                    payload: user
                });
            } else {
                dispatch({
                    type: 'INITIAL_AUTH_CHECK_FAIL'
                });
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {state.authStateLoading ? (<Loader size={100} />) : (
                children
            )}
        </AuthContext.Provider>
    );
}

export default AuthProvider;