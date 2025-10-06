import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p className="font-semibold text-lg">You're all caught up!</p>
        <p className="text-sm">Add a new task to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;