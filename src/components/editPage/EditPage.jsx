import React,{useState,useEffect} from 'react'
import {db,auth} from '../../firebase'
import {useHistory,useParams} from 'react-router-dom'


function EditPage() {


    const [task,editTask] = useState('')
    const history = useHistory()
    const params = useParams()

    useEffect(()=>{
        db.collection('users').doc(auth.currentUser.uid).collection('taskList').doc(params.id).get()//like this
        .then(task=>{
            editTask(task.data().text)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onSubmit =(e)=>{
        e.preventDefault()
        db.collection('users').doc(auth.currentUser.uid).collection('taskList').doc(params.id)//like this
        .update({text:task})
        
        history.push('/') //here i am able to access the history property //like this

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
