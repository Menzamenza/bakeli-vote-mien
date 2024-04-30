import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4-LJPRzgkYZBim1lgTLo3SJZeV5hmByY",
  authDomain: "base-de-vote-2.firebaseapp.com",
  projectId: "base-de-vote-2",
  storageBucket: "base-de-vote-2.appspot.com",
  messagingSenderId: "175903625451",
  appId: "1:175903625451:web:dfec0d9e966f2f5d8d2eae"
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
    if (email === "menzaFirebase@gmail.com" || email === "adminMariama@gmail.com") {
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




