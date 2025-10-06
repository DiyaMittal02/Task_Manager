import React, { useState } from 'react';

function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center p-4 bg-black/10 border border-white/10 rounded-lg transition-all duration-300 hover:bg-black/20 hover:scale-[1.02]">
      {isEditing ? (
        <div className="flex-grow flex items-center gap-2">
          <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="flex-grow p-2 bg-gray-800/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button onClick={handleSave} className="text-green-400 hover:text-green-300 p-1 transition-colors">✔️</button>
          <button onClick={handleCancel} className="text-red-400 hover:text-red-300 p-1 transition-colors">✖️</button>
        </div>
      ) : (
        <div className="flex items-center gap-4 flex-grow">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="h-6 w-6 shrink-0 rounded-full border-gray-300 text-purple-500 bg-gray-700 focus:ring-purple-600 cursor-pointer"
          />
          <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsEditing(true)} className="text-yellow-400 hover:text-yellow-300 p-1 transition-colors">✏️</button>
            <button onClick={() => onDelete(task.id)} className="text-red-400 hover:text-red-300 p-1 transition-colors">🗑️</button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;