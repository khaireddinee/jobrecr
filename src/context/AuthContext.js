import { createContext,useState,useEffect } from "react";
import jwt_decode from "jwt-decode";
import {useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

// giving informations to the consumers
const getuser=(varia) =>({
    user_id:varia.user_id,
    username: varia.username[0],
    first_name: varia.first_name[0],
    last_name: varia.last_name[0],
    email: varia.email[0],

})

export const AuthProvider =({children}) =>{
    let [authTokens,setAuthTokens]=useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user,setUser]=useState(()=> localStorage.getItem('authTokens') ? getuser(jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access)) : null)
    const navigate= useNavigate();
    const [showModal, setShowModal] = useState(false);
      
    let loginUser =async (e) =>{
        e.preventDefault()
        //console.log('form submitted')
        let response = await fetch('http://127.0.0.1:8000/users/login/',{
            method:'POST',
            headers:{
               'content-Type':'application/json'
           },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })
        //console.log(response.data)
        
        let data = await response.json()
        if (response.status === 200) {
            //save into local Storage
            //console.log(JSON.stringify(data))
            setAuthTokens(data)
            //console.log(data.data)
            const varia = jwt_decode(data.access)
            console.log(varia)
            
            setUser(getuser(varia))
            console.log(varia.user_id)
            //console.log(data)
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/')
        }else{
            setShowModal(true)
        }
        
    }



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let contextData = {
        user:user,
        loginUser:loginUser ,
        logoutUser:logoutUser,
        setUser:setUser,
        showModal:showModal,
        setShowModal:setShowModal
        
    }


    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}