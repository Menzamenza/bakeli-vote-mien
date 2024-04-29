// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs,getDoc,doc,updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcb59JqDUcxm80sdoCCC_3RoeZ4lBQdGA",
  authDomain: "base-de-vote.firebaseapp.com",  
  projectId: "base-de-vote",
  storageBucket: "base-de-vote.appspot.com",
  messagingSenderId: "752099241013",
  appId: "1:752099241013:web:83fc6071dd7a04b8f1157c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db = getFirestore(app);


// Ensure that this check happens whenever the page is loaded or refreshed
window.onload = function() {
  const user = auth.currentUser;
  if (!user) {
    // User is not authenticated, redirect to index.html
    window.location.href = 'index.html';
  }
};

// Référence au bouton "choisir"
let button = document.getElementById('choisir');
let incr1 = 0;
let incr2 = 0;

if (localStorage.getItem('hasVoted')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('vote1').disabled = true;
  document.getElementById('vote2').disabled = true;
  document.getElementById('choisir').disabled = true;
}


// Ajouter un écouteur d'événements pour le clic sur le bouton "choisir"
button.addEventListener('click', function () {
  // Désactiver le bouton "choisir" après le vote
  document.getElementById('vote1').disabled = true;
  document.getElementById('vote2').disabled = true;
  document.getElementById('choisir').disabled = true;
  // console.log("Vous avez déjà voté");
  
  // Enregistrer dans le stockage local que l'utilisateur a voté
  localStorage.setItem('hasVoted', true);

  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="president"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incr1++;
    // console.log(incr1, "test incr1");
    updateVote("1", incr1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incr2++;
    // console.log(incr2, "test incr2");
    updateVote("2", incr2); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVote(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "cafe", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}

// SECRETAIRE
// Référence au bouton "choisir"
let buttonSG = document.getElementById('choisirSG');
let incrSG1 = 0;
let incrSG2 = 0;

if (localStorage.getItem('hasVotedSG')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('secretaire1').disabled = true;
  document.getElementById('secretaire2').disabled = true;
  document.getElementById('choisirSG').disabled = true;
}

// Ajouter un écouteur d'événements pour le clic sur le bouton "choisir"
buttonSG.addEventListener('click', function () {
  // Désactiver le bouton "choisir" après le vote
  document.getElementById('secretaire1').disabled = true;
  document.getElementById('secretaire2').disabled = true;
  document.getElementById('choisirSG').disabled = true;
  // console.log("Vous avez déjà voté");

   // Enregistrer dans le stockage local que l'utilisateur a voté
  localStorage.setItem('hasVotedSG', true);
  
  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="secretaire"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incrSG1++;
    // console.log(incrSG1, "test incrSG1");
    updateVoteSG("1", incrSG1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incrSG2++;
    // console.log(incrSG2, "test incrSG2");
    updateVoteSG("2", incrSG2); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVoteSG(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "secretaire", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}

// ORGANISATION
// Référence au bouton "choisir"
let buttonORG = document.getElementById('choisirORG');
let incrORG1 = 0;
let incrORG2 = 0;
let incrORG3=0;
let incrORG4=0;
let incrORG5=0;

if (localStorage.getItem('hasVotedORG')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('organisation1').disabled = true;
  document.getElementById('organisation2').disabled = true;
  document.getElementById('organisation3').disabled = true;
  document.getElementById('organisation4').disabled = true;
  document.getElementById('organisation5').disabled = true;
  document.getElementById('choisirORG').disabled = true;
}

// Ajouter un écouteur d'événements pour le clic sur le bouton "choisirORG"
buttonORG.addEventListener('click', function () {
  // Désactiver le bouton "choisirORG" après le vote
  document.getElementById('organisation1').disabled = true;
  document.getElementById('organisation2').disabled = true;
  document.getElementById('organisation3').disabled = true;
  document.getElementById('organisation4').disabled = true;
  document.getElementById('organisation5').disabled = true;
  document.getElementById('choisirORG').disabled = true;
  // console.log("Vous avez déjà voté");

    // Enregistrer dans le stockage local que l'utilisateur a voté
    localStorage.setItem('hasVotedORG', true);
  
  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="organisation"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incrORG1++;
    // console.log(incrORG1, "test incrORG1");
    updateVoteORG("1", incrORG1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incrORG2++;
    // console.log(incrORG2, "test incrORG2");
    updateVoteORG("2", incrORG2); // Mettre à jour le vote pour l'option 2
  }else if (option === "3") {
    incrORG3++;
    // console.log(incrORG3, "test incrORG3");
    updateVoteORG("3", incrORG3); // Mettre à jour le vote pour l'option 2
  }else if (option === "4") {
    incrORG4++;
    // console.log(incrORG4, "test incrORG4");
    updateVoteORG("4", incrORG4); // Mettre à jour le vote pour l'option 2
  }else if (option === "5") {
    incrORG5++;
    // console.log(incrORG3, "test incrORG3");
    updateVoteORG("5", incrORG5); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVoteORG(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "oragnisation", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}



//COMUNICATION
let buttonCOM = document.getElementById('choisirCOM');
let incrCOM1 = 0;
let incrCOM2 = 0;

if (localStorage.getItem('hasVotedCOM')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('communication1').disabled = true;
  document.getElementById('communication2').disabled = true;
  document.getElementById('choisirCOM').disabled = true;
}


// Ajouter un écouteur d'événements pour le clic sur le bouton "choisirCOM"
buttonCOM.addEventListener('click', function () {
  // Désactiver le bouton "choisirCOM" après le vote
  document.getElementById('communication1').disabled = true;
  document.getElementById('communication2').disabled = true;
  document.getElementById('choisirCOM').disabled = true;
  // console.log("Vous avez déjà voté");

   // Enregistrer dans le stockage local que l'utilisateur a voté
   localStorage.setItem('hasVotedCOM', true);
  
  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="communication"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incrCOM1++;
    // console.log(incrCOM1, "test incrCOM1");
    updateVoteCOM("1", incrCOM1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incrCOM2++;
    // console.log(incrCOM2, "test incrCOM2");
    updateVoteCOM("2", incrCOM2); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVoteCOM(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "communication", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}

// RELATION EXTERIEUR
// Référence au bouton "choisir"
let buttonEXT = document.getElementById('choisirEXT');
let incrEXT1 = 0;
let incrEXT2 = 0;

if (localStorage.getItem('hasVotedEXT')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('exterieur1').disabled = true;
  document.getElementById('exterieur2').disabled = true;
  document.getElementById('choisirEXT').disabled = true;
}

// Ajouter un écouteur d'événements pour le clic sur le bouton "choisirEXT"
buttonEXT.addEventListener('click', function () {
  // Désactiver le bouton "choisirEXT" après le vote
  document.getElementById('exterieur1').disabled = true;
  document.getElementById('exterieur2').disabled = true;
  document.getElementById('choisirEXT').disabled = true;
  // console.log("Vous avez déjà voté");

   // Enregistrer dans le stockage local que l'utilisateur a voté
   localStorage.setItem('hasVotedEXT', true);
  
  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="relation_ext"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incrEXT1++;
    // console.log(incrEXT1, "test incrEXT1");
    updateVoteEXT("1", incrEXT1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incrEXT2++;
    // console.log(incrEXT2, "test incrEXT2");
    updateVoteEXT("2", incrEXT2); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVoteEXT(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "relation_exterieur", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}

// TRESORIER
// Référence au bouton "choisir"
let buttonTRES = document.getElementById('choisirTRES');
let incrTRES1 = 0;
let incrTRES2 = 0;

if (localStorage.getItem('hasVotedTRES')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('tresorier1').disabled = true;
  document.getElementById('tresorier2').disabled = true;
  document.getElementById('choisirTRES').disabled = true;
}

// Ajouter un écouteur d'événements pour le clic sur le bouton "choisirTRES"
buttonTRES.addEventListener('click', function () {
  // Désactiver le bouton "choisirTRES" après le vote
  document.getElementById('tresorier1').disabled = true;
  document.getElementById('tresorier2').disabled = true;
  document.getElementById('choisirTRES').disabled = true;
  // console.log("Vous avez déjà voté");
  
   // Enregistrer dans le stockage local que l'utilisateur a voté
   localStorage.setItem('hasVotedTRES', true);

  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="tresorier"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incrTRES1++;
    // console.log(incrTRES1, "test incrTRES1");
    updateVoteTRES("1", incrTRES1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incrTRES2++;
    // console.log(incrTRES2, "test incrTRES2");
    updateVoteTRES("2", incrTRES2); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVoteTRES(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "tresorier", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}

// PEDAGOGIE
// Référence au bouton "choisir"
let buttonPEDA = document.getElementById('choisirPEDA');
let incrPEDA1 = 0;
let incrPEDA2 = 0;
let incrPEDA3=0;

if (localStorage.getItem('hasVotedPEDA')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('pedagogie1').disabled = true;
  document.getElementById('pedagogie2').disabled = true;
  document.getElementById('pedagogie3').disabled = true;
  document.getElementById('choisirPEDA').disabled = true;
}

// Ajouter un écouteur d'événements pour le clic sur le bouton "choisirPEDA"
buttonPEDA.addEventListener('click', function () {
  // Désactiver le bouton "choisirPEDA" après le vote
  document.getElementById('pedagogie1').disabled = true;
  document.getElementById('pedagogie2').disabled = true;
  document.getElementById('pedagogie3').disabled = true;
  document.getElementById('choisirPEDA').disabled = true;
  // console.log("Vous avez déjà voté");

   // Enregistrer dans le stockage local que l'utilisateur a voté
   localStorage.setItem('hasVotedPEDA', true);
  
  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="pedagogie"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incrPEDA1++;
    // console.log(incrPEDA1, "test incrPEDA1");
    updateVotePEDA("1", incrPEDA1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incrPEDA2++;
    // console.log(incrPEDA2, "test incrPEDA2");
    updateVotePEDA("2", incrPEDA2); // Mettre à jour le vote pour l'option 2
  }else if (option === "3") {
    incrPEDA3++;
    // console.log(incrPEDA3, "test incrPEDA3");
    updateVotePEDA("3", incrPEDA3); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVotePEDA(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "pedagogie", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}

// SPORT ET LOISIR
// Référence au bouton "choisir"
let buttonSPORT = document.getElementById('choisirSPORT');
let incrSPORT1 = 0;
let incrSPORT2 = 0;
let incrSPORT3=0;

if (localStorage.getItem('hasVotedSPORT')) {
  // Désactiver les boutons de vote s'il a déjà voté
  document.getElementById('sport1').disabled = true;
  document.getElementById('sport2').disabled = true;
  document.getElementById('sport3').disabled = true;
  document.getElementById('choisirSPORT').disabled = true;
}

// Ajouter un écouteur d'événements pour le clic sur le bouton "choisirSPORT"
buttonSPORT.addEventListener('click', function () {
  // Désactiver le bouton "choisirSPORT" après le vote
  document.getElementById('sport1').disabled = true;
  document.getElementById('sport2').disabled = true;
  document.getElementById('sport3').disabled = true;
  document.getElementById('choisirSPORT').disabled = true;
  // console.log("Vous avez déjà voté");

  // Enregistrer dans le stockage local que l'utilisateur a voté
  localStorage.setItem('hasVotedSPORT', true);
  
  // Vérifier quelle option a été choisie
  let option = document.querySelector('input[name="loisir"]:checked').value;
  
  // Incrémenter le compteur de votes pour l'option choisie
  if (option === "1") {
    incrSPORT1++;
    // console.log(incrSPORT1, "test incrSPORT1");
    updateVoteSPORT("1", incrSPORT1); // Mettre à jour le vote pour l'option 1
  } else if (option === "2") {
    incrSPORT2++;
    // console.log(incrSPORT2, "test incrSPORT2");
    updateVoteSPORT("2", incrSPORT2); // Mettre à jour le vote pour l'option 2
  }else if (option === "3") {
    incrSPORT3++;
    // console.log(incrSPORT3, "test incrSPORT3");
    updateVoteSPORT("3", incrSPORT3); // Mettre à jour le vote pour l'option 2
  }
  else{
    // console.log('choisissez un cadidat');
  }
});

// Function to update vote count in Firestore
function updateVoteSPORT(option, voteCount) {
  // Mettre à jour le nombre de votes dans Firestore pour l'option spécifiée
  const docRef = doc(db, "sport", option);
  updateDoc(docRef, {
    voix: increment(voteCount)
  })
  .then(() => {
    // console.log("Nombre de votes pour l'option", option, "mis à jour avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la mise à jour du nombre de votes pour l'option", option, ": ", error);
  });
}

alert("Attention : Ce message est important !!!\n\nNous tenons à vous rappeler que vous avez le droit de voter pour un seul candidat. Une fois que vous avez exprimé votre choix, vous ne pourrez plus voter à nouveau.\n\nVeuillez noter également que si vous vous déconnectez de votre compte, vous ne pourrez plus participer au vote.");
