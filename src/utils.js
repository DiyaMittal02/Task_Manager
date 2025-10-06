export function createTask(title) {
    return {
        id: Date.now(),
        title,
        completed: false,
    };
}