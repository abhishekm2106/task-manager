import React,{useState,useEffect} from 'react'
import './header.scss'
import {auth ,db} from '../../firebase'
import {Link} from 'react-router-dom'
function Header({currentUser}) {
    const [dropDown,toggleDropDown] = useState(false)
    const [name,setName ] = useState('')

    useEffect(()=>{
        if (currentUser){
            db.collection('users').doc(currentUser.uid).onSnapshot(doc =>{
                if (doc.exists){
                    setName(doc.data().name)
                }
                else{
                    setName('')
                }
            })
        }

    },[currentUser])


    return (
        <div className='header'>
            <h3 ><Link to='/' className="page-name">Task Manager</Link></h3>
            <div className="header-list">
                

                {
                currentUser ? 
                <div className="header-item user-item" onClick={()=>toggleDropDown(prev=>!prev)}>
                    <span>{name.split(' ')[0]}</span>  
                    <div className="user-image" style={{backgroundImage:`url(${currentUser.photoURL})`}}></div>
                    {
                        dropDown?
                        <div className='drop-down'>
                            <button className='drop-down-item' onClick={()=>auth.signOut()}>Sign Out</button>
                            <Link to={`/user/${currentUser.uid}`}><button className='drop-down-item'>Profile</button></Link>
                        </div> :
                        ''
                    }
                </div>  :
                <> 
                    <Link className="header-item" to='/signup'>Sign Up</Link>
                    <Link className="header-item" to='/signin'>Sign In</Link>
                </>
                }
            </div>
            
        </div>
    )
}

export default Header
