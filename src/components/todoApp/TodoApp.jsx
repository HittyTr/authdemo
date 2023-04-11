import React, { useContext, useEffect,useState } from 'react';
import AdderChart from './AdderChart';
import ListItem from './ListItem';
import { Row, Button, Col } from 'react-bootstrap';
import { doc, updateDoc,onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { UserContext } from '../../context/UserContext';
import Spinner from 'react-bootstrap/Spinner'


function TodoApp() {

    const {currentUser}=useContext(UserContext)
    const [list,setList]=useState([])
    const [edit,setEdit]=useState({
            isEdit:false,
            pickedItem:{},
            pickedItemIndex:0
        }
    )
    const [loading,setLoading]=useState(true)

    const userRef=doc(db, "users", `${currentUser.uid}`);

    useEffect(() => {
        const unsubscribe=onSnapshot(userRef, (doc) => {
            const dbList = doc.data()
            const list=dbList.list
            setList (list)
            setLoading(false)
        });
        return () => {
            unsubscribe()
        }
    }, [userRef])

    const handleItemDelete=async(id)=>{
        try {
            const newList=list.filter((item)=>item.id!==id)
            await updateDoc(userRef, {list:newList});
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit=(id)=>{
        const item=list.find((item)=>item.id===id)
        const index=list.findIndex((item)=>item.id===id)
        setEdit({
            isEdit:true,
            pickedItem:item,
            pickedItemIndex:index
        })
    }

    const handleEditState=()=>{
        setEdit({
            isEdit:false,
            pickedItem:{},
            pickedItemIndex:0
        })
    }

    const handleCheck=async (id)=>{
        const item=list.find((item)=>item.id===id)
        const index=list.findIndex((item)=>item.id===id)
        const newList=[...list]
        newList[index].isCompleted=!item.isCompleted
        await updateDoc(userRef, {list:newList});
        setList(newList)
    }

    const handleClear=async()=>{
        try {
            const newList=list.filter((item)=>!item.isCompleted)
            await updateDoc(userRef, {list:newList});
            setList(newList)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Row >
    <Col>
       <Row>
       <AdderChart
            editInfo={edit}
            handleEditState={handleEditState}
        
        />
       </Row>
      
      <Row aria-disabled={list.length===0} className={(list.length===0) ? '' : 'list'}>
      {list.length!==0&& list.map((item,index)=>{
            return <ListItem 
            handleCheck={handleCheck} 
            editInfo={edit.isEdit} 
            handleEdit={handleEdit} 
            handleDelete={handleItemDelete} 
            key={index} 
            item={item}/>
        })}
      </Row>
      <Row className='jsCenter'>
       {loading&& <Spinner className='mt-3' animation="grow" variant="secondary" />} 
       </Row>
        <Row className='jsCenter text-center'>
        {list.length===0&!loading?<div className='mt-5'>No To Do's yet</div>:null}
        {list.length!==0? <Button className='clearButton'  onClick={handleClear} variant='outline-danger'>Clear Completed</Button>:null}
        </Row>
    </Col>
    </Row>
  )
  }

export default TodoApp;
