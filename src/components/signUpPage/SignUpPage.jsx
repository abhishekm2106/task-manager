import React,{useState} from 'react'
import {signInWithGoogle ,signInWithFacebook,signInWithEmail} from '../../firebase'

function SignUpPage() {
    const [name,changeName] = useState('')
    const [email,changeEmail] = useState('')
    const [password,changePassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        signInWithEmail(email,password,name)
    }

    return (
        <div>
            <h1>Create your account</h1>
            <form onSubmit={(e)=>{onSubmit(e)}}>
                <div className="input-box">
                    <label htmlFor='name'>Name</label>
                    <input id='name' placeholder='Enter your name here' value={name} onChange={e=>changeName(e.target.value)} />
                </div>
                <div className="input-box">
                    <label htmlFor='email'>E - Mail</label>
                    <input type='email' id='email' placeholder='Enter your email id here' value={email} onChange={e=>changeEmail(e.target.value)}/>
                </div>
                <div className="input-box">
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' placeholder='Enter your password here' value={password} onChange={e=>changePassword(e.target.value)}/>
                </div>
                <button>Create account</button>
            </form>
            <button onClick={()=>signInWithFacebook()}>Sign Up With Facebook</button>
            <button onClick={()=>signInWithGoogle()}>Sign Up With Google</button>
        </div>
    )
}

export default SignUpPage
