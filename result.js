import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB4-LJPRzgkYZBim1lgTLo3SJZeV5hmByY",
    authDomain: "base-de-vote-2.firebaseapp.com",
    projectId: "base-de-vote-2",
    storageBucket: "base-de-vote-2.appspot.com",
    messagingSenderId: "175903625451",
    appId: "1:175903625451:web:dfec0d9e966f2f5d8d2eae"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // console.log(uid);
  } else {
    // User is signed out
    // ...
    window.location.href='index.html';
  }
});


// Définir un tableau d'objets contenant les informations sur les documents à récupérer
const documentsToFetch = [
    { collection: "cafe", id: "1", targetElementId: "voice" },
    { collection: "cafe", id: "2", targetElementId: "voice2" },
    { collection: "secretaire", id: "1", targetElementId: "voiceSG1" },
    { collection: "secretaire", id: "2", targetElementId: "voiceSG2" },
    { collection: "oragnisation", id: "1", targetElementId: "voiceORG1" },
    { collection: "oragnisation", id: "2", targetElementId: "voiceORG2" },
    { collection: "oragnisation", id: "3", targetElementId: "voiceORG3" },
    { collection: "oragnisation", id: "4", targetElementId: "voiceORG4" },
    { collection: "oragnisation", id: "5", targetElementId: "voiceORG5" },
    { collection: "communication", id: "1", targetElementId: "voiceCOM1" },
    { collection: "communication", id: "2", targetElementId: "voiceCOM2" },
    { collection: "tresorier", id: "1", targetElementId: "voiceTRES1" },
    { collection: "tresorier", id: "2", targetElementId: "voiceTRES2" },
    { collection: "relation_exterieur", id: "1", targetElementId: "voiceEXT1" },
    { collection: "relation_exterieur", id: "2", targetElementId: "voiceEXT2" },
    { collection: "pedagogie", id: "1", targetElementId: "voicePEDA1" },
    { collection: "pedagogie", id: "2", targetElementId: "voicePEDA2" },
    { collection: "pedagogie", id: "3", targetElementId: "voicePEDA3" },
    { collection: "sport", id: "1", targetElementId: "voiceSPORT1" },
    { collection: "sport", id: "2", targetElementId: "voiceSPORT2" },
    { collection: "sport", id: "3", targetElementId: "voiceSPORT3" },
    // Ajoutez d'autres objets pour chaque document supplémentaire que vous souhaitez récupérer
];

// Ensure that this check happens whenever the page is loaded or refreshed
// window.onload = function() {
//     const user = auth.currentUser;
//     if (!user) {
//       // User is not authenticated, redirect to index.html
//       window.location.href = 'index.html';
//     }
//   };


// Fonction pour récupérer les données d'un document
async function fetchDocumentData(documentInfo) {
    const docRef = doc(db, documentInfo.collection, documentInfo.id);

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const documentData = docSnap.data().voix;
            // Faites quelque chose avec les données récupérées
            document.getElementById(documentInfo.targetElementId).innerText += documentData;
        } else {
            // console.log("Ce document n'existe pas :", documentInfo.id);
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du document :", error);
    }
}

// Boucle sur le tableau d'objets et récupérer les données pour chaque document
documentsToFetch.forEach(documentInfo => {
    fetchDocumentData(documentInfo);
});
