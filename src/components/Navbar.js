import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'


function Navbar() {
  let {user,logoutUser}=useContext(AuthContext)
  return (
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" style={{backgroundColor: "#8bd4e3"}} >
        <div class="container-fluid">
          <Link class="navbar-brand" to="#">Application</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {/*} {user &&
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="#">Hello {user.username}</Link>
              </li>
              }
            */}
              {user &&
              <li class="nav-item">
                <Link class="navbar-brand" aria-current="page" to="/">Profile</Link>
              </li>
              }
              {user &&
              <li class="nav-item">
                <Link class="navbar-brand" aria-current="page" to="/create">Create Project</Link>
              </li>
              }
              {user &&
              <li class="nav-item">
                <Link class="navbar-brand" aria-current="page" to="/active">Active Projects</Link>
              </li>
              }
              {user &&
              <li class="nav-item">
                <Link class="navbar-brand" aria-current="page" to="/add">Add Employee</Link>
              </li>
              }
            </ul>
            <div class="d-flex">
              <div class="mx-4">
                { user ?(
                <Link class="btn btn-outline-primary" to="/login" onClick={logoutUser}>Logout</Link>
                ):(
                  <Link class="btn btn-outline-primary" to="/login">Login</Link>
                )}
              </div>
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar