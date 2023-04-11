import React,{useContext} from 'react';
import Starter from './components/Starter';
import Register from './components/LoginRegister/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/LoginRegister/Signin';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import { UserContext } from "./context/UserContext";

function App() {
const {currentUser} =useContext(UserContext);
const RequireAuth = ({children}) =>
{
  return currentUser ? children : <Navigate to="/signin"/>
}; 

const NavigateHome = ({children}) =>
{
  return currentUser ? <Navigate to="/home"/> : children;
};

  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<NavigateHome><Starter/></NavigateHome>}/>
        <Route path="/home" element={<RequireAuth>
          <Home/>
        </RequireAuth>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
