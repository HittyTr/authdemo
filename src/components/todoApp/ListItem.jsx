
import React from "react";
import {Col ,Row,Button, Container } from "react-bootstrap";

function ListItem({item,handleDelete, handleEdit,editInfo, handleCheck}){

    return (
            <Container className="listItem mt-3 mb-3">
            <Row>
            <Col xs={7} style={{textDecoration:item.isCompleted?'line-through':'none',textAlign:'left',padding:'0 0 0 1vw'}}><span style={{wordWrap:'break-word', fontWeight:'500'}}>{item.text}</span></Col>
            <Col className="text-right pt-1" xs={1}>
            <input className="checkbox" type="checkbox" checked={item.isCompleted} onChange={()=>handleCheck(item.id)}  />
            </Col>
            <Col  style={{padding:'0 0 0 3%' }} xs={4}>
            {!editInfo&& <div ><Button variant="secondary" className="mx-2" size={"sm"} onClick={()=>handleEdit(item.id)} >Edit</Button>
            <Button variant="secondary" size={"sm"} onClick={()=>handleDelete(item.id)} >Delete</Button></div>}
            </Col>
            </Row>
            </Container>        
    )
}
export default ListItem;