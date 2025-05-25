import React, { useState} from 'react';
import './App.css';
import { Trash2, Edit3, Book, Utensils, Home, Dumbbell, Plus, X, Check, ChevronDown } from 'lucide-react';

const TodoApp = () => {

const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'read body language Book',
      completed: true,
      timestamp: '8/18/2023, 9:11:54 PM',
      icon: 'book',
      editing: false
    },
    {
      id: 2,
      text: 'Make Dinner',
      completed: true,
      timestamp: '8/18/2023, 9:11:54 PM',
      icon: 'utensils',
      editing: false
    },
    {
      id: 3,
      text: 'do home work',
      completed: true,
      timestamp: '8/18/2023, 9:11:54 PM',
      icon: 'home',
      editing: false
    },
    {
      id: 4,
      text: 'go to the Gym',
      completed: true,
      timestamp: '8/24/2023, 6:30:54 PM',
      icon: 'dumbbell',
      editing: false
    }
  ]);
  
  const [filter, setFilter] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState('');

  const getIcon = (iconType) => {
    const iconProps = { size: 18, className: "inline mr-3 text-blue-500" };
    switch(iconType) {
      case 'book': return <Book {...iconProps} />;
      case 'utensils': return <Utensils {...iconProps} />;
      case 'home': return <Home {...iconProps} />;
      case 'dumbbell': return <Dumbbell {...iconProps} />;
      default: return null;
    }
  };

  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const addTodo = () => {
    if (newTask.trim()) {
      const newTodo = {
        id: Date.now(),
        text: newTask,
        completed: false,
        timestamp: formatTimestamp(),
        icon: '',
        editing: false
      };
      setTodos([...todos, newTodo]);
      setNewTask('');
      setShowAddForm(false);
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (id, currentText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, editing: true } : todo
    ));
    setEditingTask(currentText);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editingTask, editing: false } : todo
    ));
    setEditingTask('');
  };

  const cancelEdit = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, editing: false } : todo
    ));
    setEditingTask('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-app p-4 md:p-8">
      <div className="card max-w-2xl mx-auto">
        {/* Header */}
        <div className="header">
          <h1 className="text-3xl font-bold text-white tracking-wider">TODO LIST</h1>
          <p className="text-blue-100 mt-1">Get things done, one task at a time</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium"
            >
              <Plus size={18} />
              Add Task
            </button>
            
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input appearance-none bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 pr-8 text-gray-700"
              >
                <option value="All">All Tasks</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Add Task Form */}
          {showAddForm && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="What needs to be done?"
                  className="input flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={addTodo}
                    className="btn flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-lg"
                  >
                    <Check size={16} />
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewTask('');
                    }}
                    className="btn flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Todo List */}
          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`todo-item ${todo.completed ? 'opacity-80' : ''}`}
              >
                <div className="flex items-center flex-1">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`checkbox ${todo.completed ? 'checkbox-completed' : 'checkbox-uncompleted'}`}
                  >
                    {todo.completed && <Check size={14} />}
                  </button>
                  
                  <div className="flex-1">
                    {todo.editing ? (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <input
                          type="text"
                          value={editingTask}
                          onChange={(e) => setEditingTask(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') saveEdit(todo.id);
                            if (e.key === 'Escape') cancelEdit(todo.id);
                          }}
                          className="input flex-1 px-3 py-2 border border-blue-300 rounded-lg"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(todo.id)}
                            className="btn flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                          >
                            <Check size={14} />
                            Save
                          </button>
                          <button
                            onClick={() => cancelEdit(todo.id)}
                            className="btn flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm"
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`flex items-center ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {getIcon(todo.icon)}
                          <span className="font-medium">{todo.text}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1 ml-7">
                          {todo.timestamp}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {!todo.editing && (
                  <div className="button-group">
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      className="action-button"
                      title="Edit task"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-button"
                      title="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTodos.length === 0 && (
            <div className="empty-state">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Book size={24} className="text-gray-400" />
              </div>
              <p className="text-lg font-medium">No tasks found</p>
              <p className="text-sm mt-1">Add a new task to get started!</p>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn mt-4 text-blue-500 hover:text-blue-600 font-medium flex items-center justify-center gap-1 mx-auto"
                >
                  <Plus size={16} />
                  Create your first task
                </button>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="stats">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="bg-blue-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="font-medium text-blue-600">Total:</span>
                <span>{todos.length}</span>
              </div>
              <div className="bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="font-medium text-green-600">Completed:</span>
                <span>{todos.filter(t => t.completed).length}</span>
              </div>
              <div className="bg-orange-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="font-medium text-orange-600">Active:</span>
                <span>{todos.filter(t => !t.completed).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;