import React,{useContext} from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ForceRedirect = ({children})=> {
  let {user}=useContext(AuthContext)
  //const authenticated=false
    if(user){
      return <Navigate to="/" replace />
    }
    return children
  }

export default ForceRedirect