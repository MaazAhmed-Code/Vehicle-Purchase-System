import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore , collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


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


window.Vehicles = async function Vehicles(event) {
    event.preventDefault();
    const file = document.getElementById("photo").files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "Motors");

    const res = await fetch("https://api.cloudinary.com/v1_1/dgcm7c3ny/image/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    console.log("Image URL:", data.secure_url);
    
    var make = document.getElementById('make')
    var model = document.getElementById('model')
    var year = document.getElementById('year')
    var price = document.getElementById('price')
    var mileage = document.getElementById('mileage')
    var description = document.getElementById('description')

    try {
          const docRef = await addDoc(collection(db, "Vehicles"), {
           Make : make.value,
           Model : model.value,
           Year : year.value,
           Price : price.value,
           Mileage : mileage.value,
           Description : description.value,
           imgURL : data.secure_url,
           UploadedBy : localStorage.getItem('U_id'),
           email : localStorage.getItem('email'),
           fullname : localStorage.getItem('fullname'),
          });
          console.log("Vehicle Added with ID : ", docRef.id);
        } catch (e) {
          console.error();
        } 
       make.value = ''
       model.value = ''
       year.value = ''
       price.value = ''
       mileage.value = ''
       description.value = ''
       file = ''
}