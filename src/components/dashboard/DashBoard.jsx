import React,{useState,useEffect} from 'react'
import { db , auth } from '../../firebase'

import TaskItem from '../TaskItem/TaskItem'

function DashBoard() {
    const [newTask , updateNewTask] = useState('')
    const [taskList , updateTaskList] = useState([])

    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user){
                db.collection('users').doc(user.uid).collection('taskList')
                .onSnapshot((querySnapshot)=>{
                    updateTaskList(querySnapshot.docs)
                    console.log('updated tasklist called')
                })
            }
        })
    },[])


    const onSubmit = (e)=>{
        e.preventDefault()
        if (auth.currentUser){
            db.collection('users').doc(auth.currentUser.uid).collection('taskList').add({text:newTask})
        }
        updateNewTask('')
    }


    return (
        <div>
            <h1>Stay Organised and productive</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={newTask} onChange={(e)=>updateNewTask(e.target.value)} required/>
                <button>Add</button>
            </form>
            <ul>
                {
                    taskList.map(task => <TaskItem key={task.id} id={task.id} content={task.data().text}/>)
                }
            </ul>
        </div>
    )
}

export default DashBoard
