import React,{useState }  from 'react'
import Inputs from '../components/Inputs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Project() {

  // state for the file of the form
  const [uploaded, setUploaded] = useState('')

  // to get the value of checkbox delievery service
  const handleDelievery = (event) => {
    const selectedService = event.target.value;
    setFormData((val) => ({
      ...val,
      delievery_service:selectedService
    }))
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    delievery_service: 'yes'
  });

  const handleSubmit = async (e) => {
     e.preventDefault();
     const formDataToSend = new FormData();
     formDataToSend.append('title', formData.title);
     formDataToSend.append('description', formData.description);
     formDataToSend.append('delievery_service', formData.delievery_service);
     formDataToSend.append('uploaded',uploaded);

     formDataToSend.forEach((value, key) => {
      console.log(key + ": " + value);
    });

     const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
      let response = await fetch(`http://127.0.0.1:8000/projects/project-create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Bearertoken}`,
        },
        body: formDataToSend
      });

      //console.log(response)

      if (response.status === 200) {
        console.log("success");
      } else {
        console.log("error");
      }

      toast.success('Project created',{
        autoClose:3000,
        pauseOnHover:false
      })
  };

  // to change the state values of every field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <div class="container p-4 mt-4">
         <div class="row justify-content-evenly mt-4">
            <div class="col-lg-6 col-md-12 mt-4">
                <div class="d-flex">
                    <i class="fa-solid fa-folder fs-1 mx-2"></i> <h2>Create Project</h2>
                </div>
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <form onSubmit={handleSubmit} >
                    <Inputs name="title" label="Title :" type="text" value={formData.title} onChange={handleChange} icon="fa-solid fa-pen"  />
                    <Inputs name="description" label="Description :" type="text" value={formData.description} onChange={handleChange} icon="fa-solid fa-pen" />
                    <Inputs name="file" label="Choose a file :" type="file"  onChange={(e) => setUploaded(e.target.files[0])} icon="fa-solid fa-pen" />
                    <select class="form-select" name="delievery_service" onChange={handleDelievery} >
                    <option value="" disabled selected>Delievery Service</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                     <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-outline-primary" >Create Project <i class="fa-solid fa-floppy-disk"></i></button>
                    </div>                      
                    </form>
                    <ToastContainer />
             </div>
            </div>
        </div>
    </div>
  )
}

export default Project