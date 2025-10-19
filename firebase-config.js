import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxY1rULMieHrq5wkWpmnToHN96J9JW6aM",
    authDomain: "real-esate-368c2.firebaseapp.com",
    projectId: "real-esate-368c2",
    storageBucket: "real-esate-368c2.firebasestorage.app",
    messagingSenderId: "451327486549",
    appId: "1:451327486549:web:02fd172966be06dad782dc",
    measurementId: "G-H8W1Z8VZQ4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
