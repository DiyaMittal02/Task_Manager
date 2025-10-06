// src/api/taskService.js

// This file mocks a remote API using localStorage and a fake network delay.

const TASKS_KEY = 'tasks';
const DELAY = 500; // 500ms delay to simulate network latency

const getTasksFromStorage = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToStorage = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// GET /tasks
export const getTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getTasksFromStorage();
      resolve(tasks);
    }, DELAY);
  });
};

// POST /tasks
export const addTaskAPI = (newTask) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = getTasksFromStorage();
      tasks.push(newTask);
      saveTasksToStorage(tasks);
      resolve(newTask);
    }, DELAY);
  });
};

// PUT /tasks/:id
export const updateTaskAPI = (id, updatedData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let tasks = getTasksFromStorage();
      tasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      );
      saveTasksToStorage(tasks);
      resolve(tasks.find((task) => task.id === id));
    }, DELAY);
  });
};

// DELETE /tasks/:id
export const deleteTaskAPI = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let tasks = getTasksFromStorage();
      tasks = tasks.filter((task) => task.id !== id);
      saveTasksToStorage(tasks);
      resolve({ success: true });
    }, DELAY);
  });
};