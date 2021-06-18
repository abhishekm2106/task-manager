import React,{useState,useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import { db , auth } from '../../firebase'
import './dashBoard.scss'

import TaskItem from '../TaskItem/TaskItem'

function DashBoard(props) {
    const [newTask , updateNewTask] = useState('')
    const [taskList , updateTaskList] = useState([])

    useEffect(()=>{
        const unsub = auth.onAuthStateChanged(user => {
            if (user){
                db.collection('users').doc(user.uid).collection('taskList')
                .onSnapshot((querySnapshot)=>{
                    updateTaskList(querySnapshot.docs)
                })
            }
            else{
                updateTaskList([])
            }
        })

        return unsub
    },[])


    const onSubmit = (e)=>{
        e.preventDefault()
        if (auth.currentUser){
            db.collection('users').doc(auth.currentUser.uid).collection('taskList').add({text:newTask})
        }
        else{
            alert('you are not signed in!')
        }
        updateNewTask('')
    }

    if (auth.currentUser)
    return (
        <div>
            <h1>Stay Organised and productive like me</h1>
            <form className="additemForm" onSubmit={onSubmit}>
                <input className="additemInput" placeholder="Enter name of the task here" type="text" value={newTask} onChange={(e)=>updateNewTask(e.target.value)} required/>
                <span className="line"></span>
                <button>add item</button>
            </form>
            <ul>
                {
                    taskList.map(task => <TaskItem key={task.id} id={task.id} content={task.data().text}/>)
                }
            </ul>
        </div>
    )
    else 
    return (
        <Redirect to='/signin'/>
    )
}

export default DashBoard
