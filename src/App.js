import './App.css';
import Header from './components/header/Header'
import {Route,Redirect,Switch} from 'react-router-dom'
import {auth} from './firebase'
import SignUpPage from './components/signUpPage/SignUpPage.jsx'
import SignInPage from './components/signInPage/SignInPage.jsx'
import DashBoard from './components/dashboard/DashBoard'
import {useEffect,useState} from 'react'

function App() {

  const [currentUser,setCurrentUser] = useState({})
  useEffect(() =>{
    auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
    })
  },[])

  return (
    <div className="App">
      <Header currentUser={currentUser}/>
      <Switch>
        {/* <Route exact path="/"  render={ ()=> currentUser ? <DashBoard/> : <Redirect to='/signup'/> }/>
        <Route path="/signup"  render={ ()=> currentUser ? <Redirect to='/'/> : <SignUpPage/>}/>
        <Route path="/signin"  render={ ()=> currentUser ? <Redirect to='/'/> : <SignInPage/>}/> */}
        <Route exact path='/'>
          <DashBoard/>
        </Route>
        <Route exact path='/signup'>
          <SignUpPage/>
        </Route>
        <Route exact path='/signin'>
          <SignInPage/>
        </Route>
      </Switch>
      {/* <button onClick={()=>{console.log(auth.currentUser)}}>f</button> */}
    </div>
  );
}

export default App;
