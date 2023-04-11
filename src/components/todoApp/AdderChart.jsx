import React, {useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { setDoc,getDoc, doc, Timestamp, updateDoc } from "firebase/firestore"; 
import { db,auth } from "../../firebase/firebase";

function AdderChart({editInfo,handleEditState}){

    const [input,setInput]=useState({  
        text:'',
        isCompleted:false,
        id:''
    }
    )

    const handleChange=(e)=>{
        setInput({
            ...input,
            text:e.target.value
        })
       
    }
    useEffect(() => {
        if(editInfo.isEdit){
            setInput({
                ...input,
                text:editInfo.pickedItem.text
            })
        } // eslint-disable-next-line
    }, [editInfo])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const timeStamp= Timestamp.now()
        const newInput={
            ...input,
            id:timeStamp
            }
        
        try {
            const userRef=doc(db, "users", `${auth.currentUser.uid}`);
            const listRef= await getDoc(userRef)
            const dbList = listRef.data()
            if(editInfo.isEdit){
                const newList =[...dbList.list]
                newList[editInfo.pickedItemIndex]=newInput
                updateDoc(userRef, {list:newList});
                handleEditState()
            }
            else{
            const newArr=[...dbList.list,newInput]
            setDoc(userRef, {list:newArr});
            }
            setInput({
                text:'',
                isCompleted:false,
                id:''
            })
            
        } catch (error) {

            console.log(error)
            
        }
        }

    return (
            <Form onSubmit={handleSubmit}>
                <Row className="inputArea">
               <Col xs={9}>
               <Form.Group>
                <Form.Control onChange={handleChange} value={input.text} type="text" placeholder="Write a To Do" />
                </Form.Group>
               </Col>
               <Col className="inputButton">
                {editInfo.isEdit ? <Button variant="secondary" type="submit">Save</Button> : <Button variant="secondary" type="submit">Add to List</Button>}
                </Col>
                </Row>
                
            </Form>
        
     )
}
export default AdderChart;