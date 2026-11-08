const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory task store
let tasks = [
  { id: 1, title: 'Buy groceries', dueDate: '2026-11-10', completed: false },
  { id: 2, title: 'Finish hackathon project', dueDate: '2026-11-07', completed: false },
  { id: 3, title: 'Walk the dog', dueDate: '2026-11-08', completed: true }
];
let nextId = 4;

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST new task
// BUG #3: No input validation — empty tasks can be added
app.post('/api/tasks', (req, res) => {
  const { title, dueDate } = req.body;
  const task = {
    id: nextId++,
    title: title,
    dueDate: dueDate || null,
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT toggle complete
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Todo app running at http://localhost:${PORT}`);
});
