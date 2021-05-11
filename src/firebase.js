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
export const firestore = firebase.firestore()
var provider = new firebase.auth.FacebookAuthProvider()
export const signInWithFacebook = ()=>auth.signInWithPopup(provider).then(authenticate => console.log(authenticate)).catch((error)=>alert(error.message))
export const signInWithEmail = (email, password,name)=>auth.createUserWithEmailAndPassword(email, password)
.then(
    authenticate => {
        authenticate.user.updateProfile({
            displayName:name
        })
        .then(() => {
            console.log(authenticate.user)
        }).then(
            firestore.collection('users').doc(authenticate.user.uid).set(
            {
                email: email,
                name: name,
                taskList: []
            }
            )
        )
    }
)
.catch(error=>{
    alert(error.message)
})

// firestore.collection('users').doc('adarshtiwari').set({
//     name:'abhishek m'
// }).then((users)=>{
//     console.log('success fire')
// }).catch((error)=>{
//     alert(error)
// })


