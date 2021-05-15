import React from 'react';
import './taskItem.scss';
import {db,auth} from '../../firebase'
import {Link} from 'react-router-dom'


function TaskItem({content,id}){


    const onDelete = () =>{
        db.collection('users').doc(auth.currentUser.uid).collection('taskList').doc(id).delete()
        .then(() => {console.log('deleted successfully')})
        .catch((e)=>{alert(e.message)})
    }

    return(
        <div className='taskItem'>
            <span>{content}</span>
            <div >
            <Link to={`/edit/${id}`}><button className='button'>&#9998;</button></Link>
                <button className='button' onClick={()=>onDelete()}> &#x2716; </button>
            </div>
            
        </div>
    )
}

export default TaskItem;