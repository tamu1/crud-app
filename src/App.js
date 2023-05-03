
import './App.css';
import './index';
import './custom.css'
import Header from './components/layout/header';
import Signup from './pages/signup';
import Login from './pages/login';
import Home from './pages/home';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddData from './pages/add';
import EditData from './pages/edit';

function App() {
  return (
 <>
  <ToastContainer theme='colored'></ToastContainer>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Signup/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/home' element={<Home/>}></Route>
  <Route path='/add' element={<AddData/>}></Route>
  <Route path='/edit/:dataid' element={<EditData/>}></Route>


 </Routes>
 </BrowserRouter>

 </>
  );
}

export default App;
