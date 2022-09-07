import {useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {signOut} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const HomePage = () => {

    const {dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth)

            // logout success, update user auth state
            dispatch({type: 'LOGOUT_SUCCESS'});

            toast.success('Logout Success');

            // redirect the user back to login page
            navigate('/login');
        } catch(err) {
            // logout error
            toast.error('Logout failed, please logout again');
        }
    }

    return (
        <div>
            <h1>Welcome to Home Page</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default HomePage;