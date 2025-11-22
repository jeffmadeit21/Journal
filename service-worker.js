<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Journal</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; }
    input, textarea { width: 100%; margin-bottom: 10px; padding: 10px; }
    button { padding: 10px 20px; cursor: pointer; }
    .entry { border:1px solid #ccc; padding:10px; margin-bottom:10px; }
  </style>
</head>
<body>

  <h1>My Journal</h1>

  <input type="text" id="titleInput" placeholder="Title">
  <textarea id="contentTextarea" placeholder="Write your journal here..."></textarea>
  <button id="saveBtn">Save Journal</button>

  <h2>Saved Journals</h2>
  <div id="journalList"></div>

  <!-- ======= Firebase SDKs ======= -->
  <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"></script>

  <!-- ======= Your service.js ======= -->
  <script src="service.js"></script>
</body>
</html>

