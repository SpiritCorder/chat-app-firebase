
import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

import ProtectedRoute from './utils/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {


  return (
    <div>
      {/* Nav may be */}
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<ProtectedRoute children={<HomePage />} />} />
      </Routes>
    </div>
  );
}


export default App;