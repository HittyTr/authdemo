import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Starter = () => {
    const navigate= useNavigate()
    return (
        
        <Container className="register" >
            <h2 className="text-center header"> To Do App Demo with Firebase</h2>
            <Button onClick={()=> navigate('./Signin')} variant='secondary'>
                Sign-in
            </Button>
            <Button onClick={()=> navigate('./Register')} variant='secondary'>
                Register
            </Button>
        </Container>
    )
}

export default Starter;