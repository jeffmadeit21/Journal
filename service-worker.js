<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/Journal/service-worker.js')
        .then(reg => console.log('Service Worker registered!', reg))
        .catch(err => console.log('Service Worker registration failed:', err));
    });
  }

  // LocalStorage-based journal saving
  const textarea = document.getElementById('entryText');
  const entries = document.getElementById('entries');

  // Load saved entries
  window.onload = () => {
    const saved = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    saved.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      entries.appendChild(p);
    });
  };

  function saveEntry() {
    const text = textarea.value.trim();
    if (text !== '') {
      const p = document.createElement('p');
      p.textContent = text;
      entries.appendChild(p);
      textarea.value = '';

      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem('journalEntries') || '[]');
      saved.push(text);
      localStorage.setItem('journalEntries', JSON.stringify(saved));
    }
  }
</script>
