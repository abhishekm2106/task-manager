/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import Header from './components/header/Header'
import {Route,Switch,useHistory} from 'react-router-dom'
import {auth,db} from './firebase'
import SignUpPage from './components/signUpPage/SignUpPage.jsx'
import SignInPage from './components/signInPage/SignInPage.jsx'
import DashBoard from './components/dashboard/DashBoard'
import EditPage from './components/editPage/EditPage'
import {useEffect,useState} from 'react'
import ProfilePage from './components/ProfilePage/ProfilePage';

function App() {
  const [currentUser,setCurrentUser] = useState()
  const history = useHistory()

  useEffect(() =>{
    const unsubAuth = auth.onAuthStateChanged(user=>{
      if(user){
        db.collection('users').doc(user.uid).get().then(snapshot=>{
            setCurrentUser(snapshot.data())
        })
      }
      
      else{
        setCurrentUser(null)
      }
    })

    return unsubAuth
  },[])

  return (
    <div className="App">

      <Header currentUser={currentUser}/>
      
      <Switch>

        <Route path="/"  exact currentUser={currentUser}>
          <DashBoard currentUser={currentUser}/>
        </Route> 

        <Route path="/signin" >
          <SignInPage/>
        </Route>

        <Route path='/signup' >
          <SignUpPage/>
        </Route>

        <Route path='/edit/:id' >
          <EditPage/>
        </Route>

        <Route path='/user/:uid' >
          <ProfilePage/>
        </Route>

      </Switch>
      
      <p className='credit'>Made with ❤️ by Abhishek Mohanty</p>
    </div>
  );
}

export default App;
