  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getFirestore, collection, addDoc, doc, setDoc, getDocs, getDoc, orderBy, query } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDDmnLk29OqnAhkcmnhxOLA8_yDf4QYJZg",
    authDomain: "tour-information-ebd6c.firebaseapp.com",
    projectId: "tour-information-ebd6c",
    storageBucket: "tour-information-ebd6c.appspot.com",
    messagingSenderId: "290462669563",
    appId: "1:290462669563:web:6407498194ab0c9a656e5e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app)

  export {db, collection, addDoc, doc, setDoc, getDocs, getFirestore, getDoc, orderBy, query};