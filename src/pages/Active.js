import React,{useState , useEffect } from 'react'
import {Link} from 'react-router-dom'

function Active() {

  const [projects, setProjects] = useState([]);
  const [result, setResult] = useState('');
  const [finished , setFinished] = useState('')

  useEffect(() => {
    const fetchData = async () => {
        const Bearertoken = JSON.parse(localStorage.getItem("authTokens")).access;
        //console.log(Bearertoken)
        const response = await fetch(`http://127.0.0.1:8000/projects/project-created/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${Bearertoken}`,
                'Content-Type': 'application/json'
              }
            })
            const data = await response.json();
            //console.log(!Array.isArray(data))
            //console.log(data);
            //console.log(data[2].status);
            if(data.length > 0){
             setProjects(data)
             setResult('1')
            } else {
             setResult('0')
            } 
            if (response.status === 200) {
              console.log('success');
            } else {
              console.log('error');
            }

            // search finished projects 
            const finishedProjects = data.filter(project => project.status === '2');
            //console.log(finishedProjects)
            if (finishedProjects.length === 0 ){
              console.log('empty')
              setFinished('0')
            }else {
              console.log('there is finished projects')
              setFinished('1')
            }
      };
      fetchData();
    },[]);

  return (
    <div class="container p-4 mt-4">
        <div class="row justify-content-start mt-4">
           <div class="col-lg-6 col-md-12 mt-4">
              <div class="d-flex">
                <i class="fa-solid fa-right-to-bracket fs-1 mx-2"></i> <h2>Active Projects</h2>
              </div>
              {result === '0' ? (
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <h3>No current project</h3>
                </div>
                ) : (
              projects
              .filter((project) => project.status === '0')
              .map((project) => (
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <h3 key={project.id}>{project.title}</h3>
                <Link class="btn btn-outline-primary" to={`/manage/${project.id}`}>Manage</Link>
              </div>
              ))
            )}
          </div>
          <div class="col-lg-6 col-md-12 mt-4">
            <div class="d-flex">
              <i class="fa-solid fa-right-to-bracket fs-1 mx-2"></i> <h2>Finished Projects</h2>
            </div>
            {finished === '0' ? (
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <h3>No Finished project</h3>
                </div>
                ) : (
                projects
                .filter((project) => project.status === '2')
                .map((project) => (
                <div class="p-6 shadow-lg p-3 mb-5 bg-body rounded" style={{backgroundColor: "white"}}>
                <h3 key={project.id}>{project.title}</h3>
                <Link class="btn btn-outline-primary" to={`/manage/${project.id}`}>Manage</Link>
              </div>
              ))
            )}
          </div>
       </div>
   </div>
  )
}

export default Active