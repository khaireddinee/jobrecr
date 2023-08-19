import React,{useState} from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import Inputs from '../components/Inputs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Manage() {
  const navigate= useNavigate();
  const { projectId } = useParams();
  //const [Project, setProject] = useState(null);
  //console.log(projectId);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });


  // Update Project data

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    

    formDataToSend.forEach((value, key) => {
      console.log(key + ": " + value);
    });

    const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
     let response = await fetch(`http://127.0.0.1:8000/projects/project-update/${projectId}/`, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${Bearertoken}`,
       },
       body: formDataToSend
     });

     //console.log(response)

     if (response.status === 200) {
       console.log("success");
       //const data = await response.json()
       //console.log(data)
     } else {
       console.log("error");
     }

     toast.success('Project created',{
      autoClose:3000,
      pauseOnHover:false
    })
  };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value
  }));
};

 const deleteProject = async (e) => {
  e.preventDefault();
  const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
   let response = await fetch(`http://127.0.0.1:8000/projects/project-delete/${projectId}/`, {
     method: 'DELETE',
     headers: {
       'Authorization': `Bearer ${Bearertoken}`,
       'Content-Type': 'application/json'
     },
   });

   if (response.status === 200) {
     console.log("project deleted");
   } else {
     console.log("error");
   }

   navigate('/active')
  };

  return (
    <div class="container p-4 mt-4">
         <div class="row justify-content-evenly mt-4">
            <div class="col-lg-6 col-md-12 mt-4">
                <div class="d-flex">
                    <i class="fa-solid fa-folder fs-1 mx-2"></i> <h2>Manage Project</h2>
                </div>
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <form onSubmit={handleSubmit}>
                    <Inputs name="title" label="Title :" type="text" valeur={formData.username} onChange={handleChange} icon="fa-solid fa-pen"  />
                    <Inputs name="description" label="Description :" type="text" valeur={formData.username} onChange={handleChange} icon="fa-solid fa-pen" />
                     <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-outline-primary" >Update Project <i class="fa-solid fa-floppy-disk"></i></button>
                    </div>                      
                    </form>
                    <div class="d-flex justify-content-between" style={{ marginTop: '20px' }}>
                    <button type="button" onClick={deleteProject} class="btn btn-outline-danger">Delete</button>
                    </div>
                    <ToastContainer />
             </div>
            </div>
        </div>
    </div>
  )
}

export default Manage