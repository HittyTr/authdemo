import React,{useState} from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/firebase';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[error, setError] = useState(false);
    const[loading, setLoading] = useState(false);
    const[isLogin, setIsLogin] = useState(false);
    const[user, setUser] = useState('');
    const navigate= useNavigate()

    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            setError(false);
            setLoading(false);
            setIsLogin(true);
            setUser(user.displayName)
            navigate('/')

            // ...
        })
        .catch((error) => {
            setLoading(false);
            setError(true);
         
          // ..
        });
        
    }
  
    return (
        <Container className="register">
             <h2 className="  text-center header"> Auth demo for user</h2>
        <Form  onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control onClick={()=> setError(false)} onChange={(e)=> setEmail(e.target.value)}  type="email" placeholder="Enter email" />
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control  onClick={()=> setError(false)} onChange={(e)=> setPassword(e.target.value)}  type="password" placeholder="Password" />
            </Form.Group>
            <div className="text-center"><Button className="mt-3 " style={{width:'85px'}} variant="outline-success" type="submit">{loading?<Spinner animation="border" size ='sm' variant="secondary" />:'Sign-in'}  </Button></div>
        </Form>
        {error&&<span style={{ color:'red'}} >Hata olustu </span>}
        {isLogin&&<span style={{ color:'purple'}} > {user} hosgeldin  </span>}
        </Container>
        
        )
    }

    export default Register;