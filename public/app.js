const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskList = document.getElementById('task-list');

async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.innerHTML = `
      <div class="task-info" onclick="toggleTask(${task.id})">
        <div class="task-title">${task.completed ? '✅' : '⬜'} ${escapeHtml(task.title)}</div>
        <div class="task-date">${formatDate(task.dueDate)}</div>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function formatDate(dateStr) {
  if (!dateStr) return 'No due date';
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function toggleTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'PUT' });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  const dueDate = dateInput.value;

  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, dueDate })
  });
  taskInput.value = '';
  dateInput.value = '';
  loadTasks();
});

loadTasks();
