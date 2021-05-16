import React,{useState} from 'react'
import './header.scss'
import {auth } from '../../firebase'
import {Link} from 'react-router-dom'
function Header({currentUser}) {
    const [dropDown,toggleDropDown] = useState(false)

    return (
        <div className='header'>
            <h3 ><Link to='/' className="page-name">Task Manager</Link></h3>
            <div className="header-list">
                

                {
                currentUser ? 
                <div className="header-item user-item" onClick={()=>toggleDropDown(prev=>!prev)}>
                    <span>{currentUser.displayName}</span>
                    <div className="user-image" style={{backgroundImage:`url(${currentUser.photoURL})`}}></div>
                    {
                        dropDown?
                        <div className='drop-down'>
                            <button className='drop-down-item' onClick={()=>auth.signOut()}>Sign Out</button>
                            <button className='drop-down-item'>Profile</button>
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
