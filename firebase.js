import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2ftW_Pfkh_2k-RXB580sQnbXgnb0VkYk",
  authDomain: "dria-portfolio.firebaseapp.com",
  projectId: "dria-portfolio",
  storageBucket: "dria-portfolio.firebasestorage.app",
  messagingSenderId: "561594421363",
  appId: "1:561594421363:web:090f5027eb70542c9e5a06",
  measurementId: "G-2S9TYWWQ3B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.sendMessage = async function () {

  const name =
    document.getElementById("contactName").value.trim();

  const email =
    document.getElementById("contactEmail").value.trim();

  const message =
    document.getElementById("contactMsg").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all fields.");
    return;
  }

  const btn =
    document.getElementById("contactBtn");

  btn.disabled = true;
  btn.textContent = "Sending...";

  try {

    await addDoc(
      collection(db, "messages"),
      {
        name,
        email,
        message,
        sentAt: serverTimestamp()
      }
    );

    showToast(
      "Message sent! Thank you for reaching out."
    );

    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMsg").value = "";

  }
  catch (err) {

    console.error(err);

    showToast(
      "Something went wrong. Try again!"
    );
  }

  btn.disabled = false;
  btn.textContent = "Send Message";
};