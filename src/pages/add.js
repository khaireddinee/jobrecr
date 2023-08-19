import React from 'react'
import Inputs from '../components/Inputs'

function add() {
  return (
    <div class="container p-4 mt-4">
         <div class="row justify-content-evenly mt-4">
            <div class="col-lg-6 col-md-12 mt-4">
                <div class="d-flex">
                    <i class="fa-solid fa-folder fs-1 mx-2"></i> <h2>Add Employee</h2>
                </div>
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <form >
                    <Inputs name="email" placeholder="Email Adress" type="text" icon="fa-solid fa-pen"  />
                    <select class="form-select" name="permession" >
                    <option value="" disabled selected>Permission</option>
                      <option value="yes">Admin</option>
                      <option value="no">Viewer</option>
                    </select>
                     <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-outline-primary" >Create Project <i class="fa-solid fa-floppy-disk"></i></button>
                    </div>                      
                    </form>
             </div>
            </div>
        </div>
    </div>
  )
}

export default add