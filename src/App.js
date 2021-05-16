import './App.css';
import Header from './components/header/Header'
import {Route,Switch,Redirect} from 'react-router-dom'
import {auth} from './firebase'
import SignUpPage from './components/signUpPage/SignUpPage.jsx'
import SignInPage from './components/signInPage/SignInPage.jsx'
import DashBoard from './components/dashboard/DashBoard'
import EditPage from './components/editPage/EditPage'
import {useEffect,useState} from 'react'

function App() {

  const [currentUser,setCurrentUser] = useState({})
  useEffect(() =>{
    auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
      console.log(auth.currentUser)
    })
  },[])

  return (
    <div className="App">
      <Header currentUser={currentUser}/>
      <Switch>
        <Route exact path="/"  render={ ()=> currentUser ? <DashBoard/> : <Redirect to='/signup'/> }/>
        <Route path="/signup"  render={ ()=> currentUser ? <Redirect to='/'/> : <SignUpPage/>}/>
        <Route path="/signin"  render={ ()=> currentUser ? <Redirect to='/'/> : <SignInPage/>}/>
        {/* <Route exact path='/'>
          <DashBoard/>
        </Route>
        <Route exact path='/signup' component={SignUpPage}/>

        <Route exact path='/signin' component={SignInPage}/>
    
        <Route path='/edit/:id' component={EditPage}/> */}
      </Switch>
      {/* <button onClick={()=>{console.log(auth.currentUser)}}>f</button> */}
    </div>
  );
}

export default App;
