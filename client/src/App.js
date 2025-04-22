import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Update theme in localStorage and body class
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    
    if (!newTask.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    // If editing, update the task
    if (editingTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTask].text = newTask;
      setTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Add new task
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTaskObj]);
    }
    
    setNewTask('');
    setError('');
  };

  // Edit task
  const startEditing = (index) => {
    setNewTask(tasks[index].text);
    setEditingTask(index);
  };

  // Cancel editing
  const cancelEditing = () => {
    setNewTask('');
    setEditingTask(null);
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Clear completed tasks
  const clearCompleted = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Get task stats
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do List</h1>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="todo-container">
        <h2>Manage Your Tasks</h2>
        
        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              className="add-btn"
            >
              {editingTask !== null ? 'Update Task' : 'Add Task'}
            </button>
            {editingTask !== null && (
              <button 
                type="button" 
                className="delete-btn"
                onClick={cancelEditing}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="tasks">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No {filter !== 'all' ? filter : ''} tasks to display</p>
              {filter !== 'all' && (
                <button 
                  className="filter-btn"
                  onClick={() => setFilter('all')}
                >
                  Show All Tasks
                </button>
              )}
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div 
                key={task.id} 
                className={`task-item ${task.completed ? 'task-completed' : ''}`}
              >
                <div className="task-content">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                </div>
                <div className="task-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => startEditing(tasks.findIndex(t => t.id === task.id))}
                    disabled={task.completed}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <div className="stats-section">
            <p className="stats">
              {completedCount}/{totalCount} tasks completed
            </p>
            {completedCount > 0 && (
              <button 
                className="clear-btn"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            )}
          </div>
        )}
      </div>

      <footer className="footer">
        <p>© 2025 To-Do List App | Made with ❤️</p>
      </footer>
    </div>
  );
}

export default App;