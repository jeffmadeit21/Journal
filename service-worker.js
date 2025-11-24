const firebaseConfig = {
  apiKey: "AIzaSyDYkvNf6KSrfF2MAIKFGFiksEnCClwycHg",
  authDomain: "my-journal-app-646ae.firebaseapp.com",
  projectId: "my-journal-app-646ae",
  storageBucket: "my-journal-app-646ae.appspot.com",
  messagingSenderId: "772603221141",
  appId: "1:772603221141:web:de0e97735f23e9168cc2fc"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("saveBtn").addEventListener("click", async () => {
  const title = document.getElementById("titleInput").value.trim();
  const content = document.getElementById("contentTextarea").value.trim();

  if (!title || !content) {
    alert("Please fill both fields");
    return;
  }

  try {
    await db.collection("journals").add({
      title: title,
      content: content,
      timestamp: new Date(),
    });

    alert("Journal saved successfully!");
    document.getElementById("titleInput").value = "";
    document.getElementById("contentTextarea").value = "";

  } catch (err) {
    console.error(err);
    alert("Failed to save journal");
  }
});

