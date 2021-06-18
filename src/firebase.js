import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
    apiKey: "AIzaSyC9yemqyHdY15gr5g7UPIlt_hEJ8z08QJw",
    authDomain: "iternship-58fd8.firebaseapp.com",
    projectId: "iternship-58fd8",
    storageBucket: "iternship-58fd8.appspot.com",
    messagingSenderId: "483228584440",
    appId: "1:483228584440:web:9d34a73410906301ce2e0d",
    measurementId: "G-J7X61KRW97"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth()
export const db = firebase.firestore()


const addUserToFirestore = (user)=>{

    db.collection('users').doc(user.uid).set({
        uid:user.uid,
        email:user.email,
        name:user.displayName,
        photoURL:user.photoURL
    })
}


var provider1 = new firebase.auth.FacebookAuthProvider()
export const signInWithFacebook = ()=>auth.signInWithPopup(provider1)
.then(authenticate => addUserToFirestore(authenticate.user))
.catch((error)=>alert(error.message))


var provider2 = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = ()=>auth.signInWithPopup(provider2)
.then(authenticate => addUserToFirestore(authenticate.user))
.catch((error)=>alert(error.message))


export const signUpWithEmail = (email, password,name)=>auth.createUserWithEmailAndPassword(email, password)
.then(
    authenticate => {
        authenticate.user.updateProfile({
            displayName:name
        })
        .then(() => addUserToFirestore(authenticate.user))
    }
)
.catch(error=>{
    alert(error.message)
})






export default db