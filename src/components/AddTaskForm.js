import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title);
    setTitle('');
  };

  return (
    <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your next task?"
          className="flex-grow p-3 bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200 flex items-center justify-center gap-2 shadow-lg"
        >
          + Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;