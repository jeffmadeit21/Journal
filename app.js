const firebaseConfig = {
  apiKey: "AIzaSyADljPMn8bEA3kvw6MBypIKKMfxA9ORbgU",
  authDomain: "myjournalapp-8a8f1.firebaseapp.com",
  projectId: "myjournalapp-8a8f1",
  storageBucket: "myjournalapp-8a8f1.appspot.com",
  messagingSenderId: "899997458898",
  appId: "1:899997458898:web:3bcdc4f85c1be0deb2a80b"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const journalEntry = document.getElementById("journalEntry");
const journalList = document.getElementById("journalList");
const journalSection = document.getElementById("journalSection");

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Account created!"))
    .catch(error => alert(error.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message));
}

function logout() {
  auth.signOut();
}

auth.onAuthStateChanged(user => {
  if (user) {
    journalSection.style.display = "block";
    loadJournals(user.uid);
  } else {
    journalSection.style.display = "none";
    journalList.innerHTML = "";
  }
});

function saveJournal() {
  const user = auth.currentUser;
  if (user) {
    const entry = journalEntry.value;
    db.collection("journals").add({
      entry: entry,
      uid: user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      journalEntry.value = "";
      loadJournals(user.uid);
    });
  }
}

function loadJournals(uid) {
  db.collection("journals")
    .where("uid", "==", uid)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      journalList.innerHTML = "";
      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().entry + " ";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️ Delete";
        deleteBtn.onclick = () => deleteJournal(doc.id);

        li.appendChild(deleteBtn);
        journalList.appendChild(li);
      });
    });
}

function deleteJournal(id) {
  db.collection("journals").doc(id).delete()
    .then(() => {
      alert("Journal entry deleted.");
      loadJournals(auth.currentUser.uid);
    });
}
