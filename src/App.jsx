import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import FilterControls from './components/FilterControls';
import Stats from './components/Stats';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
        setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Persist tasks to localStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    if (!title.trim()) return alert("Task name cannot be empty!");
    const newTask = { id: Date.now(), title, completed: false };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (id, newTitle) => {
    if (!newTitle.trim()) return alert("Task name cannot be empty!");
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const incompleteTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="font-sans text-white min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">Task Manager</h1>
          <p className="text-gray-300 mt-2">Organize your tasks with style</p>
        </header>

        {loading ? (
          <div className="text-center text-gray-300 py-10">Loading your tasks...</div>
        ) : (
          <main className="space-y-6">
            <Stats
              total={totalTasks}
              completed={completedTasks}
              incomplete={incompleteTasks}
            />
            <AddTaskForm onAddTask={addTask} />
            <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Filter Tasks</h2>
              <FilterControls
                currentFilter={filter}
                onSetFilter={setFilter}
                counts={{
                  all: totalTasks,
                  completed: completedTasks,
                  incomplete: incompleteTasks,
                }}
              />
              <hr className="my-6 border-white/10" />
              <h2 className="text-2xl font-bold mb-4 capitalize">{filter} Tasks</h2>
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={toggleTaskCompletion}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default App;