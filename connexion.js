import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4-LJPRzgkYZBim1lgTLo3SJZeV5hmByY",
  authDomain: "base-de-vote-2.firebaseapp.com",
  projectId: "base-de-vote-2",
  storageBucket: "base-de-vote-2.appspot.com",
  messagingSenderId: "175903625451",
  appId: "1:175903625451:web:dfec0d9e966f2f5d8d2eae"
};
//
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Fonction pour gérer les erreurs d'authentification Firebase
function handleAuthError(error) {
  let errorMessage = error.message;
  if (errorMessage.includes('auth/invalid-credential')) {
    errorMessage = 'Identifiants invalides. Veuillez vérifier votre email ou votre mot de passe.';
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

// Fonction pour gérer la connexion de l'utilisateur après l'inscription et la vérification de l'e-mail
async function handleLogin(email, password) {
  try {
      // Connecter l'utilisateur avec Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Vérifier si l'e-mail de l'utilisateur a été vérifié
      if (user && !user.emailVerified) {
          showToast('warning', 'Vérification requise', 'Veuillez vérifier votre adresse e-mail avant de vous connecter.');
          // Déconnecter l'utilisateur
          await auth.signOut();
      } else {
          // Rediriger l'utilisateur vers la page appropriée
          showToast('success', 'Connexion réussie!');
          redirectToPage(email)
         }
  } catch (error) {
      // Gérer les erreurs d'authentification
      const errorMessage = handleAuthError(error);
      showToast('error', 'Erreur de connexion', errorMessage);
  }
}

// Fonction pour rediriger l'utilisateur en fonction de son type (admin ou utilisateur normal)
function redirectToPage(email) {
  if (email === 'menzaFirebase@gmail.com' || email === 'seckmoustapha238@gmail.com') {
      window.location.href = 'resultat-vote.html'; // Redirection vers la page d'administration
  } else {
      window.location.href = 'vote.html'; // Redirection vers la page de vote pour les utilisateurs normaux
  }
}
// Écouteur d'événement pour le formulaire de connexion
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
  event.preventDefault();

  // Récupération des valeurs des champs email et password
  const email = document.getElementById('emailInp').value;
  const password = document.getElementById('passwordInp').value;

  // Connexion avec Firebase Authentication et gestion de la connexion avec la fonction handleLogin
  handleLogin(email, password);
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