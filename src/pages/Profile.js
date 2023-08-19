import React, { useContext, useState,useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Inputs from "../components/Inputs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  let { user ,setUser} = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
  const fetchUserProfile = async () => {
      const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
      const response = await fetch(`http://127.0.0.1:8000/users/profile/fetch/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${Bearertoken}`,
              'Content-Type': 'application/json'
            }
          })
  
          if (response.status === 200) {
            const userDataArray = await response.json();
            const userData = userDataArray[0];
            setUserProfile(userData);
            setFormData({
              username: userData.username,
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
            });
            //console.log(userData)
          } else {
            console.log('error fetch profile');
          }
    };
    fetchUserProfile();
  },[]);

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("authTokens")).access;
    console.log(token)
    let response = await fetch(
      `http://127.0.0.1:8000/users/user/update/${user.user_id}/`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(formData),
      }
    );
    //console.log(formData)

    if (response.status === 200) {
      console.log("update made with success");
    } else {
      alert("update error");
    }
    const data = await response.json()
    //console.log(data)
    setUser((v)=>({
      ...v,
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    })

    )

    toast.success('Profile Updated',{
      autoClose:3000,
      pauseOnHover:false
    })


  };

  return (
    <div class="container p-4 mt-4">
      <div class="row justify-content-evenly mt-4">
        <div class="col-lg-6 col-md-12 mt-4">
          <div class="d-flex">
            <i class="fa-solid fa-user fs-1 mx-2"></i> <h2>Profile</h2>
          </div>
          <div
            class="p-6 shadow-lg p-3 mb-5 bg-body rounded"
            style={{ backgroundColor: "white" }}
          >
            <form onSubmit={handleSubmit}>
              <Inputs
                name="username"
                label="Username :"
                type="text"
                valeur={formData.username}
                onChange={handleChange}
              />
              <Inputs
                name="first_name"
                label="Firstname :"
                type="text"
                valeur={formData.first_name}
                onChange={handleChange}
              />
              <Inputs
                name="last_name"
                label="Lastname :"
                type="text"
                valeur={formData.last_name}
                onChange={handleChange}
              />
              <Inputs
                name="email"
                label="Email Address :"
                type="text"
                valeur={formData.email}
                onChange={handleChange}
              />
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-outline-primary">
                  Update Profile <i class="fa-solid fa-gear"></i>
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
