import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore , collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


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

var listing = document.getElementById('AvailVehicles')

 const querySnapshot = await getDocs(collection(db, "Vehicles"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();

listing.innerHTML += `<div class="vehicle-card">
  <img src="${data.imgURL}" alt="" style="width:300px;height:auto;">
  <h2>Make : ${data.Make}</h2>
  <p>Model : ${data.Model}</p>
  <p>Price : <em>${data.Price}</em></p>
  <p>Year : ${data.Year}</p>
  <p>Mileage : ${data.Mileage}</p>
  <p>Description : ${data.Description}</p>
  <button onclick="UserDetails(this, '${data.UploadedBy}')">Buy</button>
</div>`;


  });

  window.UserDetails = async function(button, uploadedBy) {
    const currentUserId = localStorage.getItem('U_id');
    if (uploadedBy == currentUserId) {
      button.disabled = true;
      button.textContent = "You Uploaded this Car";
    } else {

      const querySnapshot = await getDocs(collection(db, "users"));
      let userInfo = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        if (data.U_id == uploadedBy){
          userInfo = data;
        }
      });
      if (userInfo) {
        alert('Contact Info:\n' + userInfo.FullName + "\n" + userInfo.Email);
      }
    }
  };
  