import React from 'react'
import './header.scss'
import {auth} from '../../firebase'
import {Link} from 'react-router-dom'
function Header({currentUser}) {
    return (
        <div className='header'>
            <h3 ><Link to='/' className="page-name">Task Manager</Link></h3>
            <div className="header-list">
                

                {
                currentUser ? 
                <div className="header-item" onClick={()=>auth.signOut()}>Sign Out</div>  :
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
