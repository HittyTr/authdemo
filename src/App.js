import React from 'react';
import Starter from './components/Starter';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/Signin';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Starter/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
