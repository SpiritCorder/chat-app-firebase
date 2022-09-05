
import {Routes, Route} from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';

const App = () => {


  return (
    <div>
      {/* Nav may be */}
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}


export default App;