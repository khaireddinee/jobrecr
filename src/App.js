import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Profile from './pages/Profile';
import Project from './pages/Project';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import {AuthProvider} from './context/AuthContext'
import PrivateRouter from './components/PrivateRouter';
import ForceRedirect from './components/ForceRedirect';
import Active from './pages/Active';
import Manage from './pages/Manage';
import Add from './pages/Add';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <div className="bg-light" style={{height: "100vh"}}>
      <AuthProvider>
        <Navbar/>
        <Routes>
        
          <Route path="/" element={
          <PrivateRouter >
          <Profile />
          </PrivateRouter>} />

          <Route path="/create" element={
          <PrivateRouter >
          <Project />
          </PrivateRouter>} />

          <Route path="/active" element={
          <PrivateRouter >
          <Active />
          </PrivateRouter>} />

          <Route path="/manage/:projectId" element={
          <PrivateRouter >
          <Manage />
          </PrivateRouter>} />

          <Route path="/add" element={
          <PrivateRouter >
          <Add />
          </PrivateRouter>} />

          <Route path="/login" element={
          <ForceRedirect >
            <Login />
          </ForceRedirect>} />

          <Route path="/register" element={
          <ForceRedirect >
           <Register />
          </ForceRedirect>} />

          <Route path="*" element={<NotFound/>} />
        
        </Routes>
      </AuthProvider>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
