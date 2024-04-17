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
//
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Fonction pour gérer les erreurs d'authentification Firebase
function handleAuthError(error) {
  let errorMessage = error.message;
  if (errorMessage.includes('auth/invalid-credential')) {
    errorMessage = 'Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.';
  } else if (errorMessage.includes('auth/invalid-email')) {
    errorMessage = 'Adresse e-mail invalide.';
  } else if (errorMessage.includes('auth/user-not-found')) {
    errorMessage = 'Utilisateur non trouvé.';
  } else if (errorMessage.includes('auth/wrong-password')) {
    errorMessage = 'Mot de passe incorrect.';
  } else {
    errorMessage = 'Erreur d\'authentification : ' + errorMessage;
  }
  return errorMessage;
}

// Fonction pour afficher un toast avec SweetAlert2
function showToast(icon, title, text) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 5000 // Durée du toast en millisecondes (3 secondes)
  });
}

// Écouteur d'événement pour le formulaire de connexion
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
  event.preventDefault();

  // Récupération des valeurs des champs email et password
  const email = document.getElementById('emailInp').value;
  const password = document.getElementById('passwordInp').value;

  // Connexion avec Firebase Authentication
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    showToast('success', 'Connexion réussie!', 'Vous êtes maintenant connecté.');
    // Vérifier si l'utilisateur est un administrateur
    if (email === 'adminMariama@gmail.com' || email=== 'adminMoustapha@gmail.com') {
      // Rediriger vers la page d'administration
      window.location.href = 'resultat-vote.html';
      } else {
      // Rediriger vers la page de connexion normale
      window.location.href = 'vote.html'; // Redirection après connexion réussie
    }
  })
  .catch((error) => {
    const errorMessage = handleAuthError(error); // Utilisation de la fonction handleAuthError
    showToast('error', 'Erreur de connexion', errorMessage);
  });
});

// Écouteur d'événement pour le lien "Mot de passe oublié"
const reset = document.getElementById('forgotpasswordlabel');
reset.addEventListener('click', function(e) {
  e.preventDefault();
  const email = document.getElementById('emailInp').value;

  // Envoi d'un email de réinitialisation du mot de passe avec Firebase Authentication
  sendPasswordResetEmail(auth, email)
  .then(() => {
    showToast('success', 'Email envoyé', 'Un email de réinitialisation a été envoyé.');
  })
  .catch((error) => {
    const errorMessage = error.message;
    showToast('error', 'Precisez votre email ', errorMessage);
  });
});
