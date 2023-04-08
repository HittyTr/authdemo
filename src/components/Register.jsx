import React,{useReducer} from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from '../firebase/firebase';
import { INITIAL_STATE, signupReducer} from "../reducers/ReducerSignup";

const Register = () => {
    const [state,dispatch]= useReducer(signupReducer,INITIAL_STATE)
    
    const handleSubmit =  (e) => {
        e.preventDefault();
       dispatch({type:'REGISTER_USER'})
        createUserWithEmailAndPassword(auth, state.email, state.password)
        .then(() => {
            dispatch({type:'REGISTER_USER_SUCCESS'})
        })
        .then(()=>
        {
            updateProfile( auth.currentUser,{
                displayName: state.username
            })
        })
        .catch((error) => {
            dispatch({type:'REGISTER_USER_FAIL'})
            console.log(error)
        });
        
    }
    const handleChange = (e) => {
        dispatch({
        type:'INPUT_CHANGED',
        payload:{name:e.target.name,value:e.target.value}})
    }
    console.log(state)
    return (
        <Container className="register">
             <h2 className="  text-center header"> Auth demo for user1</h2>
        <Form  onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={handleChange} name="username" type="text" placeholder="Enter username" />
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
            </Form.Group>
            <div className="text-center"><Button className="mt-3 " style={{width:'85px'}} variant="outline-success" type="submit">{state.loading?<Spinner animation="border" size ='sm' variant="secondary" />:'Register'}  </Button></div>
        </Form>
        {state.error&&<span style={{ color:'red'}} >Hata olustu </span>}
        </Container>
        
        )
    }

    export default Register;