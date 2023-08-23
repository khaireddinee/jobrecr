import React,{useState,useEffect} from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import Inputs from '../components/Inputs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Modal,Table } from 'react-bootstrap';

function Manage() {
  const navigate= useNavigate();
  const { projectId } = useParams();
  const strid = projectId.toString();
  //const [Project, setProject] = useState(null);
  //console.log(projectId);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  // for the modal to add employee to the project
  const [showModal, setShowModal] = useState(false);
  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // extracted emails from fetch employees data for the company
  const [emailList, setEmailList] = useState([[]]);

  // function to handle email choice (add member)
  const handleId = (event) => {
    const selectedId = event.target.value;
    setFormMember((val) => ({
      ...val,
      id_user:selectedId
    }))
  };
  // function to handle permission choice (add member)
  const handlePermission = (event) => {
    const selectedPermission = event.target.value;
    setFormMember((val) => ({
      ...val,
      user_role:selectedPermission
    }))
  };
  // state for post request add member
  const [formMember, setFormMember] = useState({
    id_project:strid,
    id_user: '',
    user_role: ''
  });

  // handle loading to avoid reading undefined data while fetching with useEffect
  const [isLoading, setIsLoading] = useState(true);

  // state for extracted project members
  const [membersList, setMembersList] = useState([[]]);

  // state to verify if this list is empty or not
  const [result, setResult] = useState('');
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

 // delete project 
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


  // fetch employees for this company 
  useEffect(() => {
    const fetchEmployees = async () => {
        const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
        //console.log(Bearertoken)
        const response = await fetch(`http://127.0.0.1:8000/employees/customer/list/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${Bearertoken}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json(); 
            if (response.status === 200) {
              console.log('success fetch employees');
              //console.log(data)
              setEmailList(JSON.parse(data))
              //console.log(emailList)
              //const extractedEmails = emailList[0][1].map(user => user.email);
              //console.log(extractedEmails)
              //console.log(Array.isArray(data));
            } else {
              console.log('error');
            }
            setIsLoading(false)
      };
      fetchEmployees();
    },[]);

    // fetch to add member to the company

    const handleAdd = async (e) => {
      e.preventDefault();
      const formDataToSend = new FormData();
      formDataToSend.append('id_project', formMember.id_project);
      formDataToSend.append('id_user', formMember.id_user);
      formDataToSend.append('user_role', formMember.user_role);
       let response = await fetch(`http://127.0.0.1:8000/projects/project-members/register/`, {
         method: 'POST',
         headers: {
         },
         body: formDataToSend
       });
 
       if (response.status === 200) {
         console.log("member added");
       } else {
         console.log("error adding member");
       }
       window.location.reload();
   };

   // fetch project members

   useEffect(() => {
    const fetchMembers = async () => {
        const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
        //console.log(Bearertoken)
        const response = await fetch(`http://127.0.0.1:8000/projects/project-members/list/${projectId}/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${Bearertoken}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json(); 
            if (response.status === 200) {
              console.log('success fetch members');
              console.log(data)
              setMembersList(JSON.parse(data))
              console.log(membersList)
              if (membersList.length === 0){
                setResult('0')
              }else {
                setResult('1')
              }
            } else {
              console.log('error');
            }
            console.log('result',result)
      };
      fetchMembers();
    },[]);

    // delete project member 
 const deleteMember = async (memberId) => {
  const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
   let response = await fetch(`http://127.0.0.1:8000/projects/project-members-delete/${memberId}/`, {
     method: 'DELETE',
     headers: {
       'Authorization': `Bearer ${Bearertoken}`,
       'Content-Type': 'application/json'
     },
   });

   if (response.status === 200) {
     console.log("member deleted");
   } else {
     console.log("error member supression");
   }
   window.location.reload();
  };

  return (
    <div class="container p-4 mt-4">
         <div class="row justify-content-evenly mt-4">
            <div class="col-lg-6 col-md-12 mt-4">
                <div class="d-flex">
                    <i class="fa-solid fa-folder fs-1 mx-2"></i> <h2>Manage Project</h2>
                </div>
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <div class="d-flex justify-content-between" style={{ marginTop: '20px' }}>
                  <button type="button" onClick={deleteProject} class="btn btn-outline-danger"><i class="fa-solid fa-user"></i> Delete Project </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <Inputs name="title" label="Title :" type="text" valeur={formData.username} onChange={handleChange} icon="fa-solid fa-pen"  />
                    <Inputs name="description" label="Description :" type="text" valeur={formData.username} onChange={handleChange} icon="fa-solid fa-pen" />
                     <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-outline-primary" >Update Project <i class="fa-solid fa-floppy-disk"></i></button>
                    </div>                      
                    </form>
                    <div class="d-flex justify-content-between" style={{ marginTop: '20px' }}>
                    <button type="button"  class="btn btn-outline-dark" onClick={handleButtonClick}>Add member</button>
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                    <form onSubmit={handleAdd} >
                         <Modal.Header closeButton>
                         <Modal.Title>Add Member to the project</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                         <label>Select User Email:</label>
                           {isLoading ? ( 
                              <div>Loading...</div>
                              ) : (
                                    <select class="form-select mb-3" name="email" onChange={handleId} >
                                      <option value="" disabled selected>Select from users</option>
                                       {emailList.map((entry, index) => (
                                            <option key={index} value={entry[1][0].id}>{entry[1][0].email}</option>
                                    ))}
                                    </select>
                          )}
                          <label>Select User Permission:</label>
                          <select class="form-select" name="permission" onChange={handlePermission} >
                           <option value="" disabled selected>Permission</option>
                           <option value="admin">Admin</option>
                           <option value="viewer">Viewer</option>
                          </select>
                         </Modal.Body>
                        <Modal.Footer>
                        <button type="submit" class="btn btn-outline-primary" >Add Member <i class="fa-solid fa-floppy-disk"></i></button>
                        </Modal.Footer>
                        </form>
                    </Modal>
                    {result === '0' ? (
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <h5>Project has no members</h5>
                </div>
                ) : (
                  <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Permission</th>
                      <th>Delete Member</th>
                    </tr>
                  </thead>
                  <tbody>
                  {membersList.map((entry) => (
                    <tr>
                      <td>{entry[3]}</td>
                      <td>{entry[2]}</td>
                      <td><button type="button" onClick={() => deleteMember(entry[0])} class="btn btn-outline-danger"><i class="fa-solid fa-user"></i> Delete Member </button></td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
                    )}
                    <ToastContainer />
             </div>
            </div>
        </div>
    </div>
  )
}

export default Manage