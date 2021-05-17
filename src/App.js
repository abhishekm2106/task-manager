/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Header from './components/header/Header'
import {Route,Switch,useHistory} from 'react-router-dom'
import {auth} from './firebase'
import SignUpPage from './components/signUpPage/SignUpPage.jsx'
import SignInPage from './components/signInPage/SignInPage.jsx'
import DashBoard from './components/dashboard/DashBoard'
import EditPage from './components/editPage/EditPage'
import {useEffect,useState} from 'react'
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
  const [currentUser,setCurrentUser] = useState({})
  const history = useHistory()

  useEffect(() =>{
    auth.onAuthStateChanged(user=>{
      setCurrentUser(user)
      if (user) history.push('/')
    })
  },[])

  return (
    <div className="App">
      <Header currentUser={currentUser}/>
      <Switch>
        {/* <Route exact path="/"  render={ ()=> currentUser ? <DashBoard/> : <Redirect to='/signup'/> }/>
        <Route path="/signup"  render={ ({match,history})=> currentUser ? <Redirect  to='/'/> : <SignUpPage match={ match} history={ history }/>}/>
        <Route path="/signin"  render={ ()=> currentUser ? <Redirect to='/'/> : <SignInPage/>}/>
        <Route path="/edit/:id"  render={ ({match,history})=> currentUser ? <EditPage match={match} history={history}/> : <SignInPage/>}/> */}

        <Route path="/"  exact component={DashBoard}/>
        <Route path="/signin" component={SignInPage}/>
        <Route path='/signup' component={SignUpPage}/>
        <Route path='/edit/:id' component={EditPage}/>
        <Route path='/user/:uid' component={ProfilePage}/>
      </Switch>
      
      <p className='credit'>Made with ❤️ by Abhishek Mohanty</p>
    </div>
  );
}

export default App;
