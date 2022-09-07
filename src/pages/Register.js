import {useContext} from 'react';
import {AuthContext} from '../context/authContext';
import {useNavigate, Link, Navigate} from 'react-router-dom';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import {auth} from '../config/firebase';
import {storage} from '../config/firebase';
import {db} from '../config/firebase';
import {toast} from 'react-toastify';
import './register.css';

const RegisterPage = () => {

    const {state: {user}, dispatch} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const avatar = e.target[3].files[0];

        try {
            // registration success
            const response = await createUserWithEmailAndPassword(auth, email, password)

            // after success upload the image
            const imageRef = ref(storage, `avatar/${displayName}`);

            const uploadTask = uploadBytesResumable(imageRef, avatar);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            return;
                    }
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(response.user, {
                            displayName,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "users", response.user.uid), {
                            uid: response.user.uid,
                            displayName,
                            avatar: downloadURL,
                            email
                        })

                        // initialize the chat for the registered user
                        await setDoc(doc(db, 'userChats', response.user.uid), {});

                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            payload: response.user
                        });

                        // all signed up process complete
                        toast.success('Registration Success');

                        navigate('/');
                    });
                }
            );

        } catch(err) {
            console.log(err.message);
        }



    }

    return (
        user ? (<Navigate to='/' />) : (
        <div className="formContainer">
            <div className="formWrapper">
                <span className='brand'>RS chat</span>
                <span className='title'>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder="display name..." />
                    <input type='text' placeholder="email..." />
                    <input type='password' placeholder="password..." />
                    <input type='file' className='uploadAvatar' />

                    <button type='submit' className='btn'>Register</button>
                </form>
                <p className='para'>already have an acount ? <Link to='/login'>Log In</Link></p>
            </div>
        </div>
        )
    );
}

export default RegisterPage;
