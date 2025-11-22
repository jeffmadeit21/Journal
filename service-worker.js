// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyABzc3PolF7g-lKxD4k5zSJ6nLy00Ht5KA",
  authDomain: "journal-app-82186.firebaseapp.com",
  projectId: "journal-app-82186",
  storageBucket: "journal-app-82186.firebasestorage.app",
  messagingSenderId: "487287603216",
  appId: "1:487287603216:web:0a079be3488fb638800a95",
  measurementId: "G-SBP78JBDMG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// SAVE JOURNAL
async function saveJournal(title, content) {
  await db.collection("journals").add({
    title: title,
    content: content,
    createdAt: new Date()
  });

  alert("Journal saved!");
}


// LOAD JOURNALS
async function loadJournals() {
  const snapshot = await db.collection("journals")
    .orderBy("createdAt", "desc")
    .get();

  let html = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    html += `
      <div class="entry">
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <small>${data.createdAt.toDate().toLocaleString()}</small>
      </div>
    `;
  });

  document.getElementById("journalList").innerHTML = html;
}


// LISTEN TO FORM
document.getElementById("journalForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  saveJournal(title, content);
});
