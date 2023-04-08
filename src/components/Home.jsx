import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
    const navigate= useNavigate()
    return (
        
        <Container className="register" >
            <h2 className="text-center header"> Auth demo for user</h2>
            <Button onClick={()=> navigate('./Signin')} variant='success'>
                Sign-in
            </Button>
            <Button onClick={()=> navigate('./Register')} variant='success'>
                Register
            </Button>
        </Container>
    )
}

export default Home;