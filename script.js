window.APP_PASS = 'h4x0r';

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.endsWith('dashboard.html')) {
    if (!sessionStorage.getItem('auth')) {
      location.href = 'admin.html';
      return;
    }
    loadCurhat();
    loadAkun();
    document.getElementById('curhatForm').addEventListener('submit', submitCurhat);
    document.getElementById('akunForm').addEventListener('submit', submitAkun);
  }
});

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.style.display='none');
  document.getElementById(id).style.display='block';
}

async function loadCurhat() {
  const res = await fetch('/api/curhat');
  const data = await res.json();
  const list = document.getElementById('curhatList');
  list.innerHTML = data.map(c => `<li>[${new Date(c.createdAt).toLocaleString()}] ${c.text}</li>`).join('');
}

async function loadAkun() {
  const res = await fetch('/api/akun');
  const data = await res.json();
  const list = document.getElementById('akunList');
  list.innerHTML = data.map(a => `<li>${a.username} (${a.email})</li>`).join('');
}

async function submitCurhat(e) {
  e.preventDefault();
  const text = document.getElementById('curhatText').value;
  if(!text) return;
  await fetch('/api/curhat', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ text })
  });
  document.getElementById('curhatText').value='';
  loadCurhat();
}

async function submitAkun(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  if(!username || !email) return;
  await fetch('/api/akun', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ username, email })
  });
  document.getElementById('username').value='';
  document.getElementById('email').value='';
  loadAkun();
}