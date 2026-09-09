const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const statusEl = document.getElementById('status');

function showStatus(message, isError = true) {
  statusEl.textContent = message;
  statusEl.hidden = false;
  if (isError) {
    statusEl.style.background = '#fdeaea';
    statusEl.style.color = '#b52b27';
  } else {
    statusEl.style.background = '#eaf7ec';
    statusEl.style.color = '#2e7d32';
  }
}

function clearStatus() {
  statusEl.hidden = true;
}

async function api(path, options) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    let message = 'Erreur serveur.';
    try {
      const data = await response.json();
      message = data.error || message;
    } catch (_) {}
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

function render(todos) {
  list.innerHTML = '';
  if (todos.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'Aucune tâche. Ajoutez-en une !';
    list.appendChild(li);
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = `todo-item${todo.completed ? ' completed' : ''}`;
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id, checkbox.checked));

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = todo.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '✕';
    deleteBtn.title = 'Supprimer';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    li.append(checkbox, title, deleteBtn);
    list.appendChild(li);
  });
}

async function loadTodos() {
  try {
    clearStatus();
    const todos = await api('/api/todos');
    render(todos);
  } catch (err) {
    showStatus('Impossible de charger les tâches : ' + err.message);
  }
}

async function addTodo(title) {
  try {
    await api('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
    await loadTodos();
  } catch (err) {
    showStatus(err.message);
  }
}

async function toggleTodo(id, completed) {
  try {
    clearStatus();
    await api(`/api/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed }),
    });
    await loadTodos();
  } catch (err) {
    showStatus(err.message);
    await loadTodos();
  }
}

async function deleteTodo(id) {
  try {
    await api(`/api/todos/${id}`, { method: 'DELETE' });
    await loadTodos();
  } catch (err) {
    showStatus(err.message);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  addTodo(title);
  input.value = '';
});

loadTodos();