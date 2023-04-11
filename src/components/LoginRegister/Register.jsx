import React,{useReducer} from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth,db} from '../../firebase/firebase';
import { INITIAL_STATE, signupReducer} from "../../reducers/ReducerSignup";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore"; 

const Register = () => {
    const [state,dispatch]= useReducer(signupReducer,INITIAL_STATE)
    const navigate= useNavigate()
    
    const handleSubmit =  (e) => {
        e.preventDefault();
       dispatch({type:'SIGNUP_USER'})
        createUserWithEmailAndPassword(auth, state.email, state.password)
        .then(() => {
            setDoc(doc(db,'users',`${auth.currentUser.uid}`),{
                list:[]
                })
        })
        .then(() => {
            dispatch({type:'SIGNUP_USER_SUCCESS'})
        })
        .then(()=>
        {
            updateProfile( auth.currentUser,{
                displayName: state.name
            })
        })
        .then(() => {
            setTimeout(() => {
                navigate('/signin')
            }, 1500);
        })
        .catch((error) => {
            dispatch({type:'SIGNUP_USER_FAIL',payload:error.code})
            console.log(error.message)
        });
        
    }
    const handleChange = (e) => {
        dispatch({
        type:'INPUT_CHANGED',
        payload:{name:e.target.name,value:e.target.value}})
    }
    
    return (
        <Container className="register">
             <h2 className="  text-center header"> To Do App Demo with Firebase</h2>
        <Form  onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control onClick={()=>dispatch({type:'CLICK_INPUT'})} onChange={handleChange} name="name" type="text" placeholder="Enter your name" />
                <Form.Label>Email address</Form.Label>
                <Form.Control onClick={()=>dispatch({type:'CLICK_INPUT'})} onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                <Form.Label>Password</Form.Label>
                <Form.Control onClick={()=>dispatch({type:'CLICK_INPUT'})} onChange={handleChange} name="password" type="password" placeholder="Password" />
            </Form.Group>
            <div className="text-center"><Button className="mt-3 " style={{width:'85px'}} variant="outline-secondary" type="submit">{state.loading?<Spinner animation="border" size ='sm' variant="secondary" />:'Register'}  </Button></div>
            <div className="text-center mt-1"><span className="clickHere" onClick={()=>navigate('/')} >Click Here</span> for Homepage</div>
        </Form>
        {state.error==='auth/email-already-in-use'&&<span style={{ color:'red'}} >Email adresi kullanilmaktadir </span>}
        {state.error==='auth/invalid-email'&&<span style={{ color:'red'}} >Email adresi gecersizdir </span>}
        {state.error==='auth/weak-password'&&<span style={{ color:'red'}} >Sifre en az 6 karakterden olusmalidir </span>}
        </Container>
        
        )
    }

    export default Register;