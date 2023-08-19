import React,{useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Inputs from '../components/Inputs'


function Register() {
  const navigate= useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [companyType, setCompanyType] = useState('');
  const [showSupplierInputs, setShowSupplierInputs] = useState(false);
//supplier extra inputs
  const handleCompanyTypeChange = (event) => {
    const selectedType = event.target.value;
    setCompanyType(selectedType);
    setFormData((val) => ({
      ...val,
      company_type:selectedType
    }))
    setShowSupplierInputs(selectedType === 'supplier'); 
  };
//registration logic
  const [formData, setFormData] = useState({
    company_name: '',
    adress: '',
    employees_number: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_active:false,
    company_type:'',
    company_owner:'',
    expertise:'',
    project_size:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.company_owner=formData.username;

    const formDataSend = {...formData}
    if (formData.company_type === 'customer') {
      delete formDataSend.project_size;
      delete formDataSend.expertise;
    }


      let response = await fetch(`http://127.0.0.1:8000/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataSend)
      });

      if (response.status === 200) {
        console.log("test");
      } else {
        setShowModal(true);
      }
     
      
  };

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
                    <i class="fa-solid fa-right-to-bracket fs-1 mx-2"></i> <h2>Register</h2>
                </div>
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <form onSubmit={handleSubmit}>
                      <Inputs name="company_name" type="text" placeholder="Company Name" value={formData.company_type} onChange={handleChange} />
                      <Inputs name="adress" type="text" placeholder="Address" value={formData.adress} onChange={handleChange} />
                      <Inputs name="employees_number" value={formData.employees_number} type="number" min="0" max="100" step="1" placeholder="Employees Number" onChange={handleChange} />
                      <select class="form-select" aria-label="Default select example" name="company_type"  value={companyType} onChange={handleCompanyTypeChange}>
                         <option value="" name="company_type" disabled selected>Company Type</option>
                         <option value="customer">Customer</option>
                         <option value="supplier">Supplier</option>
                      </select>
                      {showSupplierInputs && (
                        <div>
                         <Inputs name="project_size" type="text" placeholder="Project Size" onChange={handleChange} />
                         <Inputs name="expertise" type="text" placeholder="Expertise" onChange={handleChange} />
                       </div>
                     )}
                      <Inputs name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
                      <Inputs name="first_name" type="text" placeholder="firstname" value={formData.first_name} onChange={handleChange} />
                      <Inputs name="last_name" type="text" placeholder="Lastname" value={formData.last_name} onChange={handleChange} />
                      <Inputs name="email" type="text" placeholder="Email" value={formData.email} onChange={handleChange} />
                      <Inputs name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        <div class="d-flex justify-content-between">
                            <button type="submit" class="btn btn-outline-primary" >Register <i class="fa-solid fa-floppy-disk"></i></button>
                            <Link to="/login">I have an account</Link>
                        </div>
                      </form>

                      <div class={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabindex="-1" role="dialog" >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Success</h4>
            </div>
            <div class="modal-body">
              <h2>Account Created Successfully!</h2>
              <h5>Please wait our admin verification</h5>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" onClick={() => navigate('/login')}>Go to Login</button>
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

export default Register