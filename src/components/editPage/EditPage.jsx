import React,{useState,useEffect} from 'react'
import {db,auth} from '../../firebase'


function EditPage({match,history}) {


    const [task,editTask] = useState('')

    useEffect(()=>{
        db.collection('users').doc(auth.currentUser.uid).collection('taskList').doc(match.params.id).get()
        .then(task=>{
            editTask(task.data().text)
        })

    },[])

    const onSubmit =(e)=>{
        e.preventDefault()
        db.collection('users').doc(auth.currentUser.uid).collection('taskList').doc(match.params.id)
        .update({text:task})

        history.push('/') //here i am able to access the history property

    }

    return (
        <div>
            <h2>Edit Item</h2>
            <form onSubmit={(e)=>onSubmit(e)}>
                <input type="text" value={task} onChange={(e)=>editTask(e.target.value)} required/>
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditPage
