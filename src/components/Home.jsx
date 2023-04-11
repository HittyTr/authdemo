import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button,Col,Row } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import TodoApp from "./todoApp/TodoApp";

const Home = () => {
    const{currentUser,dispatchUser}=useContext(UserContext)
    const navigate= useNavigate()
    
    const handleLogout =  async () => {
        try {
            await signOut(auth)
            await dispatchUser({type:'LOGOUT'})
            navigate('/')
        } 
        catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
        <h2 className="text-center header"> {currentUser.displayName}'s To Do List</h2>
        <div className="logout">
        <Button  className="mt-4 mainButton" onClick={handleLogout} variant='secondary'>Logout</Button>
        </div>
        
        <Container className="main" >
           <Col>
           <Row className=' jsCenter mainRow'>
           <TodoApp/>
            
           </Row>
           </Col>
        </Container>
        </>
    )
}

export default Home;