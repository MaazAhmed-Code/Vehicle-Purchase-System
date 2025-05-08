import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore , collection, addDoc , getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHo1lWmxEVQF80lpRa3WITnBHujHE5Mw0",
  authDomain: "motors-hub-c64c4.firebaseapp.com",
  projectId: "motors-hub-c64c4",
  storageBucket: "motors-hub-c64c4.firebasestorage.app",
  messagingSenderId: "384990437688",
  appId: "1:384990437688:web:dfb02f29fd9c4efe93a1cd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.signup = async function signup(event) {
  event.preventDefault();
  let email = document.getElementById('semail');
  let password = document.getElementById('spassword');
  let fname = document.getElementById('fname');
  
const querySnapshot = await getDocs(collection(db, "users"));
let userExists = false;
for (const doc of querySnapshot.docs) {
  const data = doc.data();
  if (data.Email == email.value && data.Password == password.value) {
    userExists = true;
    break;
  }
}

if (userExists) {
  alert('The Email and Password already exist');
  email.value = '';
  password.value = '';
} else {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      FullName: fname.value,
      Password: password.value,
      Email: email.value,
      U_id: Math.random() * 5,
    });
    toggleForms();
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

  
};

window.login = async function login(event) {
  event.preventDefault();
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  const querySnapshot = await getDocs(collection(db, "users"));
  let found = false;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if(data.Email == email.value && data.Password == password.value){
      localStorage.setItem('fullname', data.FullName)
      localStorage.setItem('email', data.Email)
      localStorage.setItem('U_id', data.U_id)
      found = true;
    }
  });
  if(found){
    alert('Login Successful');
    window.location.href = 'home.html';
  } else {
    alert('Wrong Email or Password');
  }
};

window.toggleForms = function toggleForms() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  loginForm.classList.toggle('hidden');
  signupForm.classList.toggle('hidden');
};