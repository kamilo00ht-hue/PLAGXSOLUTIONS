(() => {
  const KEYS = {
    users: 'plagx_users',
    session: 'plagx_session',
    clients: 'plagx_clients',
    appointments: 'plagx_appointments',
    process: 'plagx_process'
  };

  const DEFAULT_PROCESS = [
    '1. Inspección del lugar.',
    '2. Identificación de plaga.',
    '3. Aplicación del tratamiento.',
    '4. Seguimiento posterior.',
    '5. Recomendaciones al cliente.'
  ].join('\n');

  const moneyPerAppointment = 100;

  const hashPassword = async (text) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const load = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  };
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  async function ensureUsers() {
    let users = load(KEYS.users, []);
    if (users.length) return users;
    users = [
      { username: 'admin', role: 'admin', passwordHash: await hashPassword('1234') },
      { username: 'employee', role: 'employee', passwordHash: await hashPassword('pass123') }
    ];
    save(KEYS.users, users);
    return users;
  }

  const byId = (id) => document.getElementById(id);
  const getSession = () => load(KEYS.session, null);
  const setSession = (session) => save(KEYS.session, session);

  async function initLogin() {
    await ensureUsers();
    const session = getSession();
    if (session) window.location.href = 'index.html';

    const loginForm = byId('loginForm');
    const registerForm = byId('registerForm');
    const toggleRegister = byId('toggleRegister');
    const error = byId('error');

    toggleRegister?.addEventListener('click', () => registerForm.classList.toggle('hidden'));

    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      error.textContent = '';
      const usuario = byId('usuario').value.trim();
      const clave = byId('clave').value.trim();
      if (!usuario || !clave) return (error.textContent = 'Ingrese usuario y contraseña');

      const users = load(KEYS.users, []);
      const passHash = await hashPassword(clave);
      const found = users.find(u => u.username === usuario && u.passwordHash === passHash);
      if (!found) return (error.textContent = 'Credenciales inválidas');
      setSession({ username: found.username, role: found.role, loginAt: new Date().toISOString() });
      window.location.href = 'index.html';
    });

    registerForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      error.textContent = '';
      const username = byId('regUsuario').value.trim();
      const password = byId('regClave').value.trim();
      if (username.length < 3 || password.length < 4) return (error.textContent = 'Usuario >=3 y contraseña >=4 caracteres');

      const users = load(KEYS.users, []);
      if (users.some(u => u.username === username)) return (error.textContent = 'El usuario ya existe');
      users.push({ username, role: 'employee', passwordHash: await hashPassword(password) });
      save(KEYS.users, users);
      registerForm.reset();
      registerForm.classList.add('hidden');
      error.textContent = 'Usuario creado correctamente';
      error.style.color = '#22c55e';
      setTimeout(() => (error.style.color = ''), 1500);
    });
  }

  function initApp() {
    const session = getSession();
    if (!session) return (window.location.href = 'login.html');
    byId('welcomeText').textContent = `Sesión: ${session.username} (${session.role})`;
    byId('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem(KEYS.session);
      window.location.href = 'login.html';
    });

    ensureSeedData();
    initNavigation();
    initClients();
    initAppointments();
    initProcess();
    renderAllStats();
  }

  function ensureSeedData() {
    if (!localStorage.getItem(KEYS.clients)) save(KEYS.clients, []);
    if (!localStorage.getItem(KEYS.appointments)) save(KEYS.appointments, []);
    if (!localStorage.getItem(KEYS.process)) localStorage.setItem(KEYS.process, DEFAULT_PROCESS);
  }

  function initNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
        document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
        target.classList.remove('hidden');
        link.parentElement.classList.add('active');
        if (target.id === 'estadisticas' || target.id === 'inicio') renderAllStats();
      });
    });
  }

  function initClients() {
    const form = byId('clientForm');
    const tbody = document.querySelector('#clientsTable tbody');
    const search = byId('clientSearch');

    const render = () => {
      const q = search.value.toLowerCase();
      const clients = load(KEYS.clients, []).filter(c =>
        [c.name, c.phone, c.email].join(' ').toLowerCase().includes(q)
      );
      tbody.innerHTML = clients.length ? '' : '<tr><td colspan="7">No hay clientes registrados.</td></tr>';
      clients.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${c.id}</td><td>${c.name}</td><td>${c.address}</td><td>${c.phone}</td><td>${c.email || '-'}</td><td>${c.notes || '-'}</td>
        <td><div class="table-actions"><button class="small-btn btn-secondary" data-edit="${c.id}">Editar</button><button class="small-btn" data-del="${c.id}">Eliminar</button></div></td>`;
        tbody.appendChild(tr);
      });
      updateClientSelect();
      renderAllStats();
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const clients = load(KEYS.clients, []);
      const editingId = byId('clientId').value;
      const payload = {
        id: editingId || `C${Date.now()}`,
        name: byId('clientName').value.trim(),
        address: byId('clientAddress').value.trim(),
        phone: byId('clientPhone').value.trim(),
        email: byId('clientEmail').value.trim(),
        notes: byId('clientNotes').value.trim()
      };
      if (!payload.name || !payload.address || !payload.phone) return;

      const idx = clients.findIndex(c => c.id === editingId);
      if (idx >= 0) clients[idx] = payload; else clients.push(payload);
      save(KEYS.clients, clients);
      form.reset();
      byId('clientId').value = '';
      render();
    });

    tbody.addEventListener('click', (e) => {
      const idEdit = e.target.dataset.edit;
      const idDel = e.target.dataset.del;
      const clients = load(KEYS.clients, []);
      if (idEdit) {
        const c = clients.find(x => x.id === idEdit);
        if (!c) return;
        byId('clientId').value = c.id;
        byId('clientName').value = c.name;
        byId('clientAddress').value = c.address;
        byId('clientPhone').value = c.phone;
        byId('clientEmail').value = c.email;
        byId('clientNotes').value = c.notes;
      }
      if (idDel) {
        save(KEYS.clients, clients.filter(c => c.id !== idDel));
        const appointments = load(KEYS.appointments, []).filter(a => a.clientId !== idDel);
        save(KEYS.appointments, appointments);
        render();
        renderAppointments();
      }
    });

    search.addEventListener('input', render);
    render();
  }

  let selectedDate = new Date().toISOString().slice(0, 10);
  let currentMonth = new Date();

  function updateClientSelect() {
    const select = byId('appointmentClient');
    if (!select) return;
    const clients = load(KEYS.clients, []);
    select.innerHTML = clients.map(c => `<option value="${c.id}">${c.name} (${c.id})</option>`).join('');
    if (!clients.length) select.innerHTML = '<option value="">No hay clientes</option>';
  }

  function initAppointments() {
    updateClientSelect();
    byId('appointmentDate').value = selectedDate;
    byId('selectedDateLabel').textContent = selectedDate;

    byId('appointmentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const appointments = load(KEYS.appointments, []);
      const editingId = byId('appointmentId').value;
      const item = {
        id: editingId || `A${Date.now()}`,
        clientId: byId('appointmentClient').value,
        date: byId('appointmentDate').value,
        time: byId('appointmentTime').value,
        pestType: byId('appointmentPest').value.trim(),
        status: byId('appointmentStatus').value,
        notes: byId('appointmentNotes').value.trim()
      };
      if (!item.clientId || !item.date || !item.time || !item.pestType) return;

      const idx = appointments.findIndex(a => a.id === editingId);
      if (idx >= 0) appointments[idx] = item; else appointments.push(item);
      save(KEYS.appointments, appointments);
      byId('appointmentForm').reset();
      byId('appointmentId').value = '';
      byId('appointmentDate').value = selectedDate;
      renderCalendar();
      renderAppointments();
      renderAllStats();
    });

    byId('appointmentSearch').addEventListener('input', renderAppointments);
    byId('prevMonth').addEventListener('click', () => { currentMonth.setMonth(currentMonth.getMonth() - 1); renderCalendar(); });
    byId('nextMonth').addEventListener('click', () => { currentMonth.setMonth(currentMonth.getMonth() + 1); renderCalendar(); });

    renderCalendar();
    renderAppointments();
  }

  function renderCalendar() {
    const grid = byId('calendarGrid');
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    byId('calendarTitle').textContent = `${currentMonth.toLocaleString('es', { month: 'long' })} ${y}`;

    grid.innerHTML = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => `<div class="day-name">${d}</div>`).join('');
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) grid.innerHTML += '<div></div>';

    const appointments = load(KEYS.appointments, []);
    const today = new Date().toISOString().slice(0, 10);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(y, m, d).toISOString().slice(0, 10);
      const hasEvents = appointments.some(a => a.date === date);
      const cls = ['day-cell'];
      if (date === today) cls.push('today');
      if (date === selectedDate) cls.push('selected');
      if (hasEvents) cls.push('has-events');
      grid.innerHTML += `<button type="button" class="${cls.join(' ')}" data-date="${date}">${d}</button>`;
    }

    grid.querySelectorAll('[data-date]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedDate = btn.dataset.date;
        byId('appointmentDate').value = selectedDate;
        byId('selectedDateLabel').textContent = selectedDate;
        renderCalendar();
        renderAppointments();
      });
    });
  }

  function renderAppointments() {
    const tbody = document.querySelector('#appointmentsTable tbody');
    const q = byId('appointmentSearch').value.toLowerCase();
    const clients = Object.fromEntries(load(KEYS.clients, []).map(c => [c.id, c.name]));

    const items = load(KEYS.appointments, [])
      .filter(a => a.date === selectedDate)
      .filter(a => [clients[a.clientId] || '', a.pestType, a.status].join(' ').toLowerCase().includes(q))
      .sort((a, b) => a.time.localeCompare(b.time));

    tbody.innerHTML = items.length ? '' : '<tr><td colspan="6">No hay citas para este día.</td></tr>';
    items.forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${a.time}</td><td>${clients[a.clientId] || 'Cliente eliminado'}</td><td>${a.pestType}</td><td>${a.status}</td><td>${a.notes || '-'}</td>
      <td><div class="table-actions"><button class="small-btn btn-secondary" data-aedit="${a.id}">Editar</button><button class="small-btn" data-adel="${a.id}">Eliminar</button></div></td>`;
      tbody.appendChild(tr);
    });

    tbody.onclick = (e) => {
      const appointments = load(KEYS.appointments, []);
      const editId = e.target.dataset.aedit;
      const delId = e.target.dataset.adel;
      if (editId) {
        const a = appointments.find(x => x.id === editId);
        if (!a) return;
        byId('appointmentId').value = a.id;
        byId('appointmentClient').value = a.clientId;
        byId('appointmentDate').value = a.date;
        byId('appointmentTime').value = a.time;
        byId('appointmentPest').value = a.pestType;
        byId('appointmentStatus').value = a.status;
        byId('appointmentNotes').value = a.notes;
      }
      if (delId) {
        save(KEYS.appointments, appointments.filter(a => a.id !== delId));
        renderCalendar();
        renderAppointments();
        renderAllStats();
      }
    };
  }

  function initProcess() {
    const area = byId('processText');
    area.value = localStorage.getItem(KEYS.process) || DEFAULT_PROCESS;
    byId('saveProcess').addEventListener('click', () => localStorage.setItem(KEYS.process, area.value));
  }

  function renderAllStats() {
    const clients = load(KEYS.clients, []);
    const appointments = load(KEYS.appointments, []);
    const now = new Date();

    const completedThisMonth = appointments.filter(a => {
      const d = new Date(`${a.date}T00:00:00`);
      return a.status === 'Completada' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    const pending = appointments.filter(a => a.status === 'Pendiente').length;
    const income = completedThisMonth * moneyPerAppointment;

    const stats = [
      { label: 'Total Clientes', value: clients.length },
      { label: 'Completadas (mes)', value: completedThisMonth },
      { label: 'Pendientes', value: pending },
      { label: 'Ingresos ($)', value: income }
    ];

    const html = stats.map(s => `<div class="card"><h3>${s.label}</h3><p class="number">${s.value}</p></div>`).join('');
    byId('homeStats').innerHTML = html;
    byId('statsGrid').innerHTML = html;
    byId('pendingNotif').textContent = pending;

    const total = Math.max(appointments.length, 1);
    const completed = appointments.filter(a => a.status === 'Completada').length;
    const pendingCount = appointments.filter(a => a.status === 'Pendiente').length;
    byId('statusChart').innerHTML = `
      <div class="bar"><div class="bar-fill completed" style="height:${(completed / total) * 100}%"></div><small>Completadas (${completed})</small></div>
      <div class="bar"><div class="bar-fill" style="height:${(pendingCount / total) * 100}%"></div><small>Pendientes (${pendingCount})</small></div>
    `;
  }

  if (document.body.classList.contains('login-body')) initLogin();
  if (document.querySelector('.main-content')) initApp();
})();
