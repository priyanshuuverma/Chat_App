import React, { useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { Routes , Route, Navigate} from 'react-router-dom'
import Homepage from './Pages/Homepage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import SettingPage from './Pages/SettingPage'
import ProfilePage from './Pages/ProfilePage'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore.js'
import {Toaster} from "react-hot-toast"
import {Loader} from'lucide-react'
const App = () => {
  const {authUser, checkAuth,isCheckingAuth, onlineUsers} = useAuthStore();

  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  
  console.log({authUser})
  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )

  return ( 
    <div>
      <Navbar/>  
      <Routes>
        <Route path="/" element ={ authUser ? <Homepage/> : <Navigate to="/login"/>} />
        <Route path="/signup" element ={!authUser ? <SignUpPage/> : <Navigate to="/"/>} />
        <Route path="/login" element ={ !authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path="/setting" element ={<SettingPage/> } />
        <Route path="/profile" element ={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
      </Routes>    
      <Toaster/>
    </div>
  )
}

export default App