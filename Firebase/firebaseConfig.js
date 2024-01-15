import { firebase } from "@firebase/app";
//import modules
import "@firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBx-FlmNDmpE_tflqqBs3XpQreZ8Dr0j9A",
    authDomain: "drevs-project.firebaseapp.com",
    projectId: "drevs-project",
    storageBucket: "drevs-project.appspot.com",
    messagingSenderId: "19968252747",
    appId: "1:19968252747:web:a8915b6da4b71e718fe6ce",
    measurementId: "G-1Q1LT7ZZWN"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase;
  