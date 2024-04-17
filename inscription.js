import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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


// Écouteur d'événement pour le formulaire d'inscription
const submit = document.getElementById('submit');
submit.addEventListener("click", async function(event){
    event.preventDefault();

    // Récupération des valeurs des champs email et password
    const email = document.getElementById('emailInp').value;
    const password = document.getElementById('passwordInp').value;

    // Vérification de la validité de l'adresse e-mail
    if (!isValidEmail(email)) {
        // Afficher un toast d'erreur
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Adresse e-mail invalide.',
            showConfirmButton: false,
            timer: 5000 // Durée du toast en millisecondes (5 secondes)
        });
        return; // On arret la fonction si l'adresse e-mail est invalide
    }

    // Vérification de la longueur du mot de passe
    if (password.length < 6) {
        // Afficher un toast d'erreur
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Le mot de passe doit contenir au moins 6 caractères.',
            showConfirmButton: false,
            timer: 5000 // Durée du toast en millisecondes (5 secondes)
        });
        return; // On arrete la fonction si le mot de passe est trop court
    }

    try {
        // Créer l'utilisateur avec Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Afficher un toast de succès
        Swal.fire({
            icon: 'success',
            title: 'Inscription réussie!',
            showConfirmButton: false,
            timer: 5000 // Durée du toast en millisecondes (4 secondes)
        }).then(() => {
            // Vérifier si l'utilisateur est un administrateur
            if (email === 'adminMariama@gmail.com' || email=== 'adminMoustapha@gmail.com') {
                 // Rediriger vers la page d'administration
                 window.location.href = 'admin.html';
                 } else {
                 // Rediriger vers la page de connexion normale
                 window.location.href = 'connexion.html';
             }
            // window.location.href='connexion.html';
        });
    } catch (error) {
        // Capturer l'erreur et afficher un toast d'erreur avec le message personnalisé
        let errorMessage = error.message;
        if (errorMessage.includes('auth/email-already-in-use')) {
            errorMessage = 'Cette adresse e-mail est déjà utilisée.';
        }
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: errorMessage,
            showConfirmButton: false,
            timer: 5000 // Durée du toast en millisecondes (5 secondes)
        });
    }
});

// Fonction pour valider une adresse e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

