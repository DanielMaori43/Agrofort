// ------------------------- LOGIN -------------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === 'admin' && pass === '1234') {
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('loginError').textContent = 'Usuário ou senha incorretos';
    }
  });
}

// ---------------------- MENU RESPONSIVO ----------------------
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

// --------------------- FUNÇÕES DE TELA ---------------------
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.classList.add('hidden'));
  const selected = document.getElementById(sectionId);
  if (selected) {
    selected.classList.remove('hidden');
    atualizarRelatorio();
  }
}

// ------------------------ DADOS ------------------------
let pesticidas = [];
let ferramentas = [];

// ---------------------- PESTICIDAS ----------------------
function addPesticida(event) {
  event.preventDefault();
  const nome = document.getElementById('nomePesticida').value;
  const valor = parseFloat(document.getElementById('valorPesticida').value);
  if (nome && !isNaN(valor)) {
    pesticidas.push({ nome, valor });
    document.getElementById('nomePesticida').value = '';
    document.getElementById('valorPesticida').value = '';
    renderPesticidas();
    atualizarRelatorio();
  }
}

function removePesticida(index) {
  pesticidas.splice(index, 1);
  renderPesticidas();
  atualizarRelatorio();
}

function renderPesticidas() {
  const tbody = document.getElementById('pesticidasTable');
  tbody.innerHTML = '';
  pesticidas.forEach((item, index) => {
    const row = `<tr>
      <td>${item.nome}</td>
      <td>R$ ${item.valor.toFixed(2)}</td>
      <td><button onclick="removePesticida(${index})">❌</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// ---------------------- FERRAMENTAS ----------------------
function addFerramenta(event) {
  event.preventDefault();
  const nome = document.getElementById('nomeFerramenta').value;
  const valor = parseFloat(document.getElementById('valorFerramenta').value);
  if (nome && !isNaN(valor)) {
    ferramentas.push({ nome, valor });
    document.getElementById('nomeFerramenta').value = '';
    document.getElementById('valorFerramenta').value = '';
    renderFerramentas();
    atualizarRelatorio();
  }
}

function removeFerramenta(index) {
  ferramentas.splice(index, 1);
  renderFerramentas();
  atualizarRelatorio();
}

function renderFerramentas() {
  const tbody = document.getElementById('ferramentasTable');
  tbody.innerHTML = '';
  ferramentas.forEach((item, index) => {
    const row = `<tr>
      <td>${item.nome}</td>
      <td>R$ ${item.valor.toFixed(2)}</td>
      <td><button onclick="removeFerramenta(${index})">❌</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// -------------------- RELATÓRIO DE SAFRA --------------------
function atualizarRelatorio() {
  const container = document.getElementById('custosRelatorio');
  if (!container) return;

  const totalPesticidas = pesticidas.reduce((acc, item) => acc + item.valor, 0);
  const totalFerramentas = ferramentas.reduce((acc, item) => acc + item.valor, 0);
  const totalGeral = totalPesticidas + totalFerramentas;

  container.innerHTML = `
    <p>🧪 Pesticidas: <strong>R$ ${totalPesticidas.toFixed(2)}</strong></p>
    <p>🔧 Ferramentas/Máquinas: <strong>R$ ${totalFerramentas.toFixed(2)}</strong></p>
    <p>💰 <strong>Total Geral:</strong> <strong>R$ ${totalGeral.toFixed(2)}</strong></p>
  `;
}

// -------------------- INICIALIZAÇÃO --------------------
if (document.getElementById('pesticidasTable')) {
  renderPesticidas();
  renderFerramentas();
  atualizarRelatorio();
}
