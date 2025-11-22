/* ===============================
   1. FIREBASE INITIALIZATION
================================*/

const firebaseConfig = {
  apiKey: "AIzaSyABzc3PolF7g-lKxD4k5zSJ6nLy00Ht5KA",
  authDomain: "journal-app-82186.firebaseapp.com",
  projectId: "journal-app-82186",
  storageBucket: "journal-app-82186.firebasestorage.app",
  messagingSenderId: "487287603216",
  appId: "1:487287603216:web:0a079be3488fb638800a95",
  measurementId: "G-SBP78JBDMG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



/* ===============================
   2. SAVE JOURNAL TO FIRESTORE
================================*/

async function saveJournalToFirebase(title, content) {
  await db.collection("journals").add({
    title: title,
    content: content,
    createdAt: new Date()
  });

  alert("Journal saved permanently!");
}



/* ===============================
   3. LOAD JOURNALS FROM FIRESTORE
================================*/

async function loadJournalsFromFirebase() {
  const snapshot = await db.collection("journals")
    .orderBy("createdAt", "desc")
    .get();

  let html = "";

  snapshot.forEach(doc => {
    const data = doc.data();

    html += `
      <div class="entry" style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <small>${data.createdAt.toDate().toLocaleString()}</small>
      </div>
    `;
  });

  document.getElementById("journalList").innerHTML = html;
}



/* ===============================
   4. CONNECT TO SAVE BUTTON
================================*/

document.getElementById("saveBtn").addEventListener("click", () => {

  const title = document.getElementById("titleInput").value.trim();
  const content = document.getElementById("contentTextarea").value.trim();

  if (title === "" || content === "") {
    alert("Please fill both title and content");
    return;
  }

  saveJournalToFirebase(title, content);

  // Clear after saving
  document.getElementById("titleInput").value = "";
  document.getElementById("contentTextarea").value = "";

  // Reload journals to show the new one
  loadJournalsFromFirebase();
});


/* ===============================
   5. LOAD JOURNALS ON PAGE LOAD
================================*/

window.onload = () => {
  loadJournalsFromFirebase();
};
