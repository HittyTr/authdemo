import React,{useState} from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from '../firebase/firebase';

const Register = () => {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(false);
    const[loading, setLoading] = useState(false);
    
    
    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Signed in
            setError(false);
            setLoading(false);
            // ...
        })
        .then(()=>
        {
            updateProfile( auth.currentUser,{
                displayName: username
            })
        })
        .catch((error) => {
            setLoading(false);
          setError(true);
            console.log(error)
          // ..
        });
        
    }
    return (
        <Container className="register">
             <h2 className="  text-center header"> Auth demo for user1</h2>
        <Form  onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={(e)=> setUsername(e.target.value)}  type="text" placeholder="Enter username" />
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e)=> setEmail(e.target.value)}  type="email" placeholder="Enter email" />
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e)=> setPassword(e.target.value)}  type="password" placeholder="Password" />
            </Form.Group>
            <div className="text-center"><Button className="mt-3 " style={{width:'85px'}} variant="outline-success" type="submit">{loading?<Spinner animation="border" size ='sm' variant="secondary" />:'Register'}  </Button></div>
        </Form>
        {error&&<span style={{ color:'red'}} >Hata olustu </span>}
        </Container>
        
        )
    }

    export default Register;