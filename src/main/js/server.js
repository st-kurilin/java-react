const reloadPage = logMessage => err => {
    console.error(logMessage, err);
    if (confirm("Error occurred. Reload page?")) {
        location.reload();
    }
};
const parseJson = resp => resp.json();
const jsonHeaders = {'Accept': 'application/json'};

export const loadTasks = fetch("/tasks", {headers: jsonHeaders})
    .then(parseJson).catch(reloadPage("Error on tasks loading"));

export const createTask = title => fetch('/tasks',
    {
        headers: jsonHeaders,
        method: 'PUT',
        body: JSON.stringify({title})
    }).then(parseJson).catch(reloadPage("Error on task creation"));

export const markTaskAsDone = id => fetch(`/tasks/${id}/mark-as-done`,
    {
        headers: jsonHeaders,
        method: 'POST',
    }).catch(reloadPage("Error on marking task done"));

export const deleteTask = id => fetch(`/tasks/${id}`,
    {
        headers: jsonHeaders,
        method: 'DELETE',
    }).catch(reloadPage("Error on deleting task"));


