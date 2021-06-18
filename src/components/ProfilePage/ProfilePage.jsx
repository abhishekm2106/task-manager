import React,{useEffect,useState} from 'react'
import {db} from '../../firebase'
import { useParams } from 'react-router-dom'
import './profile-page.scss'

function ProfilePage() {

    const {uid} = useParams()
    const [loading,toggleLoading] = useState(true)
    const [user,setUser] = useState()

    useEffect(() =>{
        db.collection('users').doc(uid).get()
        .then(snapshot=>{
            setUser(snapshot.data())
            toggleLoading(!loading)
        })
    },[])

    return (
        <div className='profile-body'>
            {
                loading ? <div>loading...</div> 
                :<>
                    <div className="profile-image" style={{backgroundImage:`url(${user.photoURL})`}}></div> 
                    <h2>{user.name}</h2>
                </>
            }
            {/*  */}
        </div>
    )
}

export default ProfilePage
