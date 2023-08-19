import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PrivateRouter = ({children})=> {
  //const authenticated=false
  let {user}=useContext(AuthContext)
  if(!user){
    return <Navigate to="/login" replace />
  }
  return children
}

export default PrivateRouter