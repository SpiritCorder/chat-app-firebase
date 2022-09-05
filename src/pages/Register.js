
import {Link} from 'react-router-dom';
import './register.css';

const RegisterPage = () => {


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className='brand'>RS chat</span>
                <span className='title'>Register</span>
                <form>
                    <input type='text' placeholder="display name..." />
                    <input type='text' placeholder="email..." />
                    <input type='password' placeholder="password..." />
                    <input type='file' className='uploadAvatar' />

                    <button type='submit' className='btn'>Register</button>
                </form>
                <p className='para'>already have an acount ? <Link to='/login'>Log In</Link></p>
            </div>
        </div>
    );
}

export default RegisterPage;
