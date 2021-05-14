import React,{useState} from 'react'
import { auth,signInWithFacebook,signInWithGoogle } from '../../firebase'

function SignInPage() {

    const [email,changeEmail] = useState('')
    const [password,changePassword] = useState('')

    const onSubmit=(e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then(()=>{
            console.log('signInWithEmailAndPassword successful')
        }).catch(error=>{
            alert(error.message)
        })
    }

    return (
        <div>
            <h1>Sign In to your account</h1>
            <form onSubmit={(e)=>onSubmit(e)}>
                <div className="input-box">
                    <label htmlFor='email'>E - Mail</label>
                    <input type='email' id='email' placeholder='Enter your email id here' value={email} onChange={e=>changeEmail(e.target.value)}/>
                </div>
                <div className="input-box">
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' placeholder='Enter your password here' value={password} onChange={e=>changePassword(e.target.value)}/>
                </div>
                <button>Sign In</button>
            </form>
            <button onClick={()=>signInWithFacebook()}>Sign In With Facebook</button>
            <button onClick={()=>signInWithGoogle()}>Sign In With Google</button>
        </div>
    )
}

export default SignInPage
