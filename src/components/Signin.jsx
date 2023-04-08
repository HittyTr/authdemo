import React,{useContext, useReducer} from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { signinReducer,INITIAL_STATE } from "../reducers/PostReducerSignin";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const[state,dispatch] = useReducer(signinReducer,INITIAL_STATE)
    const navigate= useNavigate()
    const {currentUser,dispatchAuth} = useContext(AuthContext)
    const handleSubmit =  (e) => {
        
        e.preventDefault();
        dispatch({type:'LOGIN_USER'})
        signInWithEmailAndPassword(auth, state.email, state.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            dispatchAuth({type:'LOGIN',payload:user})
            dispatch({type:'LOGIN_USER_SUCCESS'})
            setTimeout(() => {
                navigate('/home')
            }, 1500);

            // ...
        })
        
        .catch((error) => {
            dispatch({type:'LOGIN_USER_FAIL'})
            console.log(error)
         
          // ..
        });
        
    }
    const handleChange = (e) => {
        dispatch({type:'INPUT_CHANGED',payload:{name:e.target.name,value:e.target.value}})
        
    }
   
    return (
        <Container className="register">
             <h2 className="  text-center header"> Auth demo for user</h2>
        <Form  onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control onClick={()=> dispatch({type:'CLICK_INPUT'})} onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control  onClick={()=> dispatch({type:'CLICK_INPUT'})} onChange={handleChange}  name='password' type="password" placeholder="Password" />
            </Form.Group>
            <div className="text-center"><Button className="mt-3 " style={{width:'85px'}} variant="outline-success" type="submit">{state.loading?<Spinner animation="border" size ='sm' variant="secondary" />:'Sign-in'}  </Button></div>
        </Form>
        {state.error&&<span style={{ color:'red'}} >Hata olustu </span>}
        {state.isLogin&&<span style={{ color:'purple'}} > {currentUser.displayName} hosgeldin  </span>}
        </Container>
        
        )
    }

    export default Register;