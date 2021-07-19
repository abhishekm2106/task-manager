import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { db } from '../../firebase'
import './dashBoard.scss'

import TaskItem from '../TaskItem/TaskItem'

function DashBoard({ currentUser }) {
    const [newTask, updateNewTask] = useState('')
    const [taskList, updateTaskList] = useState([])

    useEffect(() => {
        console.log('ooooooo', currentUser)
        if (currentUser) {
            var unsub = db.collection('users').doc(currentUser.uid).collection('taskList')
                .onSnapshot((querySnapshot) => {
                    updateTaskList(querySnapshot.docs)
                })
            return unsub
        }
        else {
            updateTaskList([])
        }
    }, [currentUser])


    const onSubmit = (e) => {
        e.preventDefault()
        if (currentUser) {
            db.collection('users').doc(currentUser.uid).collection('taskList').add({ text: newTask })
        }
        else {
            alert('you are not signed in!')
        }
        updateNewTask('')
    }

    return (
        <>
            {
                currentUser ?
                    <div>
                        <h1>Stay Organised and productive af</h1>
                        <form className="additemForm" onSubmit={onSubmit}>
                            <input className="additemInput" placeholder="Enter name of the task here" type="text" value={newTask} onChange={(e) => updateNewTask(e.target.value)} required />
                            <span className="line"></span>
                            <button>add item</button>
                        </form>
                        <ul>
                            {
                                taskList.map(task => <TaskItem key={task.id} id={task.id} content={task.data().text} />)
                            }
                        </ul>
                    </div>
                    :
                    <Redirect to='/signin' />
            }
        </>
    )


}

export default DashBoard
