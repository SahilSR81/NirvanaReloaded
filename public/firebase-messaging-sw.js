importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBpe5Duu6EtmHlZ5qg8D5Ab6-U4zXMUfmw",
  authDomain: "nirvanareloaded.firebaseapp.com",
  projectId: "nirvanareloaded",
  messagingSenderId: "84578738258",
  appId: "1:84578738258:web:8d655563b4d8f285e73f8b",
  measurementId: "G-LQJRMEQSP0"
});

const messaging = firebase.messaging(); 
