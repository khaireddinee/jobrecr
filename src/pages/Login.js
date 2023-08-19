import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import Inputs from '../components/Inputs'
import AuthContext from '../context/AuthContext'

function Login() {
 let {loginUser,showModal,setShowModal}=useContext(AuthContext)
  return (
    <div class="container p-4 mt-4">
         <div class="row justify-content-evenly mt-4">
            <div class="col-lg-6 col-md-12 mt-4">
                <div class="d-flex">
                    <i class="fa-solid fa-right-to-bracket fs-1 mx-2"></i> <h2>Login</h2>
                </div>
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <form onSubmit={loginUser} >
                    <Inputs name="username" label="Username" type="text" icon="fa-solid fa-user" placeholder="Username" />
                    <Inputs name="password" label="Password" type="password" icon="fa-solid fa-key" placeholder="Password" />
                          <div class="d-flex justify-content-between">
                            <button type="submit" class="btn btn-outline-primary">Login <i class="fa-solid fa-floppy-disk"></i></button>
                            <Link to="/register">I don't have an account</Link>
                        </div>                      
                    </form>
                    <div class={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Alert</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h2>Authentification error !</h2>
        <h5>Please Check your informations</h5>
      </div>
    </div>
  </div>
</div>

             </div>
            </div>
        </div>
    </div>
   
  )
}


export default Login