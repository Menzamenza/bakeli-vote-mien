import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcb59JqDUcxm80sdoCCC_3RoeZ4lBQdGA",
  authDomain: "base-de-vote.firebaseapp.com",
  projectId: "base-de-vote",
  storageBucket: "base-de-vote.appspot.com",
  messagingSenderId: "752099241013",
  appId: "1:752099241013:web:83fc6071dd7a04b8f1157c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// submit
const submit= document.getElementById('submit');
submit.addEventListener("click", function(event){
    event.preventDefault();

    // inputs
    const email= document.getElementById('emailInp').value
    const password= document.getElementById('passwordInp').value
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    if (email === "adminMoustapha@gmail.com" || email === "adminMariama@gmail.com") {
      window.location.href='resultat-vote.html'
    } else {
      
      const user = userCredential.user;
      alert("Vous n'êtes pas un Administrateur!")
      window.location.href='connexion.html'
      // ...
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
})

// reset
const reset= document.getElementById('forgotpasswordlabel');
reset.addEventListener('click', function(e){
  e.preventDefault();
  const email=document.getElementById('emailInp').value
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('Un Email vous a été envoyé!')
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
})




