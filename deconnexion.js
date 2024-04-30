
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";



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
const firestore = getFirestore(app);


// Function to handle errors
function handleError(error) {
    const errorMessage = error.message || "Une erreur s'est produite.";
    alert(errorMessage);
  }
  
  // Déconnexion de l'utilisateur
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener("click", async function(event){
      event.preventDefault();
  
      try {
          // Assurer que l'utilisateur est connecté
          const user = auth.currentUser;
          if (!user) {
              throw new Error("Aucun utilisateur connecté.");
          }
  
          // Récupérer l'email de l'utilisateur
          const userEmail = user.email;
  
          // Stocker l'email dans Firestore
          await addDoc(collection(firestore, 'disconnectedUsers'), {
              email: userEmail
          });
  
          // Déconnexion de l'utilisateur
          await auth.signOut();
          window.location.href = 'index.html';
      } catch (error) {
          handleError(error);
      }
  });
  
  // Vérification de l'email lors de la connexion de l'utilisateur
  auth.onAuthStateChanged(async user => {
      if (user) {
          try {
              // Utilisateur connecté, vérifier si son email est dans la liste des déconnectés
              const userEmail = user.email;
              const q = query(collection(firestore, 'disconnectedUsers'), where('email', '==', userEmail));
  
              const querySnapshot = await getDocs(q);
              if (!querySnapshot.empty) {
                  // L'utilisateur est dans la liste des déconnectés, refuser la connexion
                  await auth.signOut();
                  alert("Vous avez déjà voté!");
                  window.location.href = 'index.html';
              } else {
                  // L'utilisateur n'est pas dans la liste des déconnectés, autoriser la connexion
                  // alert("Vous êtes autorisé à vous connecter.");
              }
          } catch (error) {
              handleError(error);
          }
      }
  });