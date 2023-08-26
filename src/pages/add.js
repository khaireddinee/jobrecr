import React,{useContext,useState,useEffect} from 'react'
import Inputs from "../components/Inputs";
import AuthContext from "../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add() {
  let { user} = useContext(AuthContext);
  const uId=user.user_id;
  //console.log(user.username);
  const [id, setId] = useState('')


  const handlePerm = (event) => {
    const selectedPerm = event.target.value;
    setFormData((val) => ({
      ...val,
      user_permission:selectedPerm
    }))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const [formData, setFormData] = useState({
    user_permission: '',
    user_id: '',
    company_id: ''
  });

   // to get the id of the company of the current user

  useEffect(() => {
    const fetchCompanyId = async () => {
        const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
        //console.log(Bearertoken)
        const username = user.username; 
        const response = await fetch(`http://127.0.0.1:8000/companies/customer/list/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${Bearertoken}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json(); 
            if (response.status === 200) {
              console.log('id of the current user s company');
              //console.log(data)
              const companyId = data.find(company => company.company_owner === username)?.id;
              //console.log(companyId)
              setId(companyId)
              //console.log(id)
              toast.success('Project created',{
                autoClose:3000,
                pauseOnHover:false
              })
            } else {
              console.log('error');
            }
      };
      fetchCompanyId();
    },[]);

    useEffect(() => {
        setFormData(prevFormData => ({
          ...prevFormData,
          company_id: id
        }));
      }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('user_permission', formData.user_permission);
    formDataToSend.append('user_id', formData.user_id);
    formDataToSend.append('company_id', formData.company_id);

    const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
     let response = await fetch(`http://127.0.0.1:8000/employees/customer/register/`, {
       method: 'POST',
       headers: {
       },
       body: formDataToSend
     });

     if (response.status === 200) {
       console.log("employee added");
     } else {
       console.log("error");
     }
 }; 

  return (
    <div class="container p-4 mt-4">
         <div class="row justify-content-evenly mt-4">
            <div class="col-lg-6 col-md-12 mt-4">
                <div class="d-flex">
                    <i class="fa-solid fa-folder fs-1 mx-2"></i> <h2>Add Employee</h2>
                </div>
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <form onSubmit={handleSubmit} >
                    <Inputs name="user_id" placeholder="User Id" type="text" onChange={handleChange} icon="fa-solid fa-pen"  />
                    <select class="form-select mb-3" name="user_permission" onChange={handlePerm} >
                    <option value="" disabled selected>Permission</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                     <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-outline-primary" >Add <i class="fa-solid fa-floppy-disk"></i></button>
                    </div>                      
                    </form>
                    <ToastContainer />
             </div>
            </div>
        </div>
    </div>
  )
}

export default Add;