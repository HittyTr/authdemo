import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Home = () => {
    const{currentUser,dispatchAuth}=useContext(AuthContext)
    const navigate= useNavigate()
    
    const handleLogout = () => {
        signOut(auth).
        then(
        dispatchAuth({type:'LOGOUT'})
        )
        .then (
            navigate('/'))
        
    }

    return (
        <Container className="register" >
            <h2 className="text-center header"> Auth demo for {currentUser.displayName} is finished</h2>
            <Button onClick={handleLogout} variant='success'>Logout</Button>
        </Container>
    )
}

export default Home;