import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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

// Fonction pour gérer la connexion de l'utilisateur après l'inscription et la vérification de l'e-mail
async function handleLogin(email, password) {
    try {
        // Connectez l'utilisateur avec Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Rediriger l'utilisateur vers la page de connexion
        window.location.href = 'connexion.html';
    } catch (error) {
        // Capturer l'erreur et afficher un toast d'erreur avec le message personnalisé
        let errorMessage = error.message;
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: errorMessage,
            showConfirmButton: false,
            timer: 5000 // Durée du toast en millisecondes (5 secondes)
        });
    }
}

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
        return; // On arrête la fonction si l'adresse e-mail est invalide
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
        return; // On arrête la fonction si le mot de passe est trop court
    }

    try {
        // Créer l'utilisateur avec Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Envoyer un e-mail de vérification
        await sendEmailVerification(auth.currentUser);

        // Afficher un toast de succès
        Swal.fire({
            icon: 'success',
            title: 'Inscription réussie!',
            text: 'Un e-mail de vérification a été envoyé à votre adresse e-mail. Veuillez vérifier votre boîte de réception et cliquer sur le lien de vérification pour activer votre compte.',
            showConfirmButton: false,
            timer: 8000 // Durée du toast en millisecondes (4 secondes)
        }).then(() => {
            // Vérifier si l'utilisateur est un administrateur
            if (email === 'menzaFirebase@gmail.com' || email === 'adminMoustapha@gmail.com') {
                 // Rediriger vers la page d'administration
                 window.location.href = 'admin.html';
            } else {
                 // L'utilisateur n'est pas administrateur, gérer la connexion
                 handleLogin(email, password);
            }
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



