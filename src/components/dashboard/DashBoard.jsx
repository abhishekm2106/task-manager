import React,{useState,useEffect} from 'react'
import { db , auth } from '../../firebase'

function DashBoard() {
    const [newTask , updateNewTask] = useState('')
    const [taskList , updateTaskList] = useState([])

    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if (user){
                db.collection('users').doc(user.uid).collection('taskList')
                .onSnapshot((querySnapshot)=>{
                    updateTaskList(querySnapshot.docs)
                })
            }
        })
    },[])


    const onSubmit = (e)=>{
        e.preventDefault()
        if (auth.currentUser){
            db.collection('users').doc(auth.currentUser.uid).collection('taskList').add({task:newTask})
        }
        updateNewTask('')
    }


    return (
        <div>
            <h1>Stay Organised and productive</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={newTask} onChange={(e)=>updateNewTask(e.target.value)} />
                <button>Add</button>
            </form>
            <ul>
                {
                    taskList.map(task => <li className="task" key={task.id}>{task.data().task}</li>)
                }
            </ul>
        </div>
    )
}

export default DashBoard
