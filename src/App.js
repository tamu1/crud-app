
import './App.css';
import './index';
import './custom.css'
// import Header from './components/layout/header';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddData from './pages/add';
import EditData from './pages/edit';
// import Form from './pages/register';
import Pagenotfound from './pages/Pagenotfound';
import PrivateRoute from './auth/PrivateRoute';
import { Navigate } from 'react-router-dom';

function App() {
  // const isLoggedIn = JSON.parse(sessionStorage.getItem('name')) !== null;
  return (
    <>
      <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />}></Route>
          {/* <Route path='/register' element={<Form />}></Route> */}
          <Route path='/login' element={<Login />}></Route>
          {/* <Route path='/login' element={<PrivateRoute element={<Login />} />} /> */}
          {/* <Route
            path='/login'
            element={isLoggedIn ? <Navigate to='/home' replace /> : <Login />}
          /> */}
          <Route path='/add' element={<AddData />}></Route>
          <Route path='/edit/:dataid' element={<EditData />}></Route>
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />

          <Route path="*" element={<Pagenotfound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
