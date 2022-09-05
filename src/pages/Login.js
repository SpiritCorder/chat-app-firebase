import {useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import './register.css';

const LoginPage = () => {

    const {dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;
    
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: response.user
            });

            toast.success('Login Success');

            navigate('/');
            
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className='brand'>RS chat</span>
                <span className='title'>Login</span>
                <form onSubmit={handleSubmit}>
                    {/* <input type='text' placeholder="display name..." /> */}
                    <input type='text' placeholder="email..." />
                    <input type='password' placeholder="password..." />
                    

                    <button type='submit' className='btn'>Login</button>
                </form>
                <p className='para'>don't have an acount ? <Link to='/register'>Sign Up</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;