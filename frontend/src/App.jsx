
import './App.css'
import axios from 'axios'
import { Routes,Route } from 'react-router-dom'
import { UserContextProvider } from "../context/userContext";
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import Landing from './pages/Landing'
import { PrivateProvider, PrivateRoute } from "../context/PrivateContext";
import UserDashboard from './pages/Userdashboard';
import { Admindashboard } from './pages/Admindashboard';



axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true

function App() {
  

  return (
    <>
<UserContextProvider>
<PrivateProvider>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route
                        path="/user-dashboard"
                        element={<PrivateRoute requiredRole="user"><UserDashboard /></PrivateRoute>}
                    />
      <Route
                        path="/admin-dashboard"
                        element={<PrivateRoute requiredRole="admin"><Admindashboard /></PrivateRoute>}
                    />

    </Routes>
    </PrivateProvider>
    </UserContextProvider>
      
    </>
  )
}

export default App
