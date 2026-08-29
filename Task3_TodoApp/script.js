document.addEventListener('DOMContentLoaded', () => {
  let tasks = JSON.parse(localStorage.getItem('oibsip_todos')) || [
    {
      id: '1',
      title: 'Complete OIBSIP Web Dev Task',
      category: 'Work',
      priority: 'High',
      dueDate: '2026-09-30',
      completed: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 26,
      completedAt: null
    },
    {
      id: '2',
      title: 'Record demo video walkthrough',
      category: 'Work',
      priority: 'Medium',
      dueDate: '2026-09-25',
      completed: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 50,
      completedAt: Date.now() - 1000 * 60 * 60 * 2
    }
  ];

  let searchQuery = '';
  let editingId = null;

  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const categoryInput = document.getElementById('categoryInput');
  const priorityInput = document.getElementById('priorityInput');
  const dateInput = document.getElementById('dateInput');
  const pendingList = document.getElementById('pendingList');
  const completedList = document.getElementById('completedList');
  const searchInput = document.getElementById('searchInput');
  const taskStats = document.getElementById('taskStats');
  const pendingCount = document.getElementById('pendingCount');
  const completedCount = document.getElementById('completedCount');

  dateInput.value = new Date().toISOString().split('T')[0];

  function saveAndRender() {
    localStorage.setItem('oibsip_todos', JSON.stringify(tasks));
    renderTasks();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function formatTimestamp(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
      ' · ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }

  function matchesSearch(task) {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    return task.title.toLowerCase().includes(q) || task.category.toLowerCase().includes(q);
  }

  function buildTaskItem(task, todayStr) {
    const isOverdue = task.dueDate && task.dueDate < todayStr && !task.completed;
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('draggable', 'true');
    li.dataset.id = task.id;

    const isEditing = editingId === task.id;

    const titleMarkup = isEditing
      ? `<input type="text" class="task-title-input" value="${escapeHTML(task.title)}" data-edit-input>`
      : `<span class="task-title">${escapeHTML(task.title)}</span>`;

    const timestampLabel = task.completed
      ? `<span class="timestamp">Completed ${formatTimestamp(task.completedAt)}</span>`
      : `<span class="timestamp">Added ${formatTimestamp(task.createdAt)}</span>`;

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark complete">
        <div class="task-content">
          ${titleMarkup}
          <div class="task-meta">
            <span class="tag">${escapeHTML(task.category)}</span>
            <span class="priority priority-${task.priority.toLowerCase()}">${task.priority}</span>
            <span class="due-date ${isOverdue ? 'overdue' : ''}">
              ${isOverdue ? '⚠️ Overdue: ' : 'Due: '}${task.dueDate}
            </span>
            ${timestampLabel}
          </div>
        </div>
      </div>
      <div class="task-actions">
        ${isEditing
          ? `<button class="action-btn save" title="Save">💾</button>`
          : `<button class="action-btn edit" title="Edit task">✏️</button>`}
        <button class="action-btn delete" title="Delete task">🗑️</button>
      </div>
    `;

    // Checkbox toggle
    li.querySelector('.task-checkbox').addEventListener('change', (e) => {
      task.completed = e.target.checked;
      task.completedAt = task.completed ? Date.now() : null;
      saveAndRender();
    });

    // Delete
    li.querySelector('.delete').addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      if (editingId === task.id) editingId = null;
      saveAndRender();
    });

    // Edit / Save (true inline editing, no prompt())
    if (isEditing) {
      const input = li.querySelector('[data-edit-input]');
      const commit = () => {
        const newTitle = input.value.trim();
        if (newTitle) task.title = newTitle;
        editingId = null;
        saveAndRender();
      };
      li.querySelector('.save').addEventListener('click', commit);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); commit(); }
        if (e.key === 'Escape') { editingId = null; renderTasks(); }
      });
      // Focus after render
      requestAnimationFrame(() => { input.focus(); input.select(); });
    } else {
      li.querySelector('.edit').addEventListener('click', () => {
        editingId = task.id;
        renderTasks();
      });
    }

    // Drag and drop (reorder within same list only)
    li.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', task.id);
      setTimeout(() => li.classList.add('dragging'), 0);
    });
    li.addEventListener('dragend', () => li.classList.remove('dragging'));

    return li;
  }

  function renderList(listEl, statusTasks, emptyMessage, todayStr) {
    listEl.innerHTML = '';
    const filtered = statusTasks.filter(matchesSearch);
    if (filtered.length === 0) {
      const div = document.createElement('div');
      div.className = 'empty-state';
      div.textContent = emptyMessage;
      listEl.appendChild(div);
      return;
    }
    filtered.forEach(task => listEl.appendChild(buildTaskItem(task, todayStr)));
  }

  function renderTasks() {
    const todayStr = new Date().toISOString().split('T')[0];
    const pending = tasks.filter(t => !t.completed);
    const completed = tasks.filter(t => t.completed);

    renderList(pendingList, pending, 'No pending tasks — add one above or you\u2019re all caught up.', todayStr);
    renderList(completedList, completed, 'Nothing completed yet.', todayStr);

    pendingCount.textContent = `${pending.length} pending`;
    completedCount.textContent = `${completed.length} completed`;
    taskStats.textContent = `${pending.length} pending · ${completed.length} completed`;
  }

  // Drag-over / drop reordering, scoped to each list independently
  [pendingList, completedList].forEach(listEl => {
    listEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggingItem = listEl.querySelector('.dragging');
      if (!draggingItem) return; // don't allow cross-list drops
      const siblings = [...listEl.querySelectorAll('.task-item:not(.dragging)')];
      const nextSibling = siblings.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest;
      }, { offset: Number.NEGATIVE_INFINITY }).element;

      if (nextSibling) listEl.insertBefore(draggingItem, nextSibling);
      else listEl.appendChild(draggingItem);
    });

    listEl.addEventListener('drop', (e) => {
      e.preventDefault();
      const status = listEl.dataset.status;
      const newOrderIds = [...listEl.querySelectorAll('.task-item')].map(item => item.dataset.id);
      const isPending = status === 'pending';

      // Reorder just the affected subset, keep the other subset's relative order intact
      const affected = tasks.filter(t => (!t.completed) === isPending);
      const untouched = tasks.filter(t => (!t.completed) !== isPending);
      affected.sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));
      tasks = isPending ? [...affected, ...untouched] : [...untouched, ...affected];
      saveAndRender();
    });
  });

  // Add task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    tasks.unshift({
      id: Date.now().toString(),
      title,
      category: categoryInput.value,
      priority: priorityInput.value,
      dueDate: dateInput.value,
      completed: false,
      createdAt: Date.now(),
      completedAt: null
    });

    taskInput.value = '';
    dateInput.value = new Date().toISOString().split('T')[0];
    saveAndRender();
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTasks();
  });

  renderTasks();
});
