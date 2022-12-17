import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC8XvV3W0oSC0OYU7H1B9HCDHzOPF9IRms",
  authDomain: "surview-tpf.firebaseapp.com",
  projectId: "surview-tpf",
  storageBucket: "surview-tpf.appspot.com",
  messagingSenderId: "932831456499",
  appId: "1:932831456499:web:29074c5559c674e1675b86"
}

// Init firebase
const app = initializeApp(firebaseConfig)

// Init authentication 
export const auth = getAuth(app)