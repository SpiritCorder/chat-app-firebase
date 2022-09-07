import {useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const {state: {user}} = useContext(AuthContext);

    return (
        user !== null ? (children) : (<Navigate to='/login' />)
    );

}

export default ProtectedRoute;