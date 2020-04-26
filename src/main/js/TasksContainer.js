import React, {useState, useEffect} from "react";
import {loadTasks, createTask, markTaskAsDone, deleteTask} from "./server"
import Tasks from "./Tasks"

export default () => {
    const [tasks, setTasks] = useState([]);
    const [taskInCreation, setTaskInCreation] = useState(false);
    useEffect(() => {
        const ignoredOutput = () => loadTasks.then(setTasks);
        ignoredOutput();
    }, []);
    const onTaskCreate = title => {
        setTaskInCreation(true);
        return createTask(title)
            .then(id => setTasks([...tasks, {id, title}]))
            .finally(() => setTaskInCreation(false));
    };
    const onMarkTaskAsDone = id => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: true} : t));
        markTaskAsDone(id);
    };
    const onTaskDelete = id => {
        deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
    };
    return <div>
        <Tasks todo={tasks.filter(t => !t.isDone)}
               done={tasks.filter(t => t.isDone)}
               onTaskDelete={onTaskDelete}
               onMarkTaskAsDone={onMarkTaskAsDone}
               taskInCreation={taskInCreation} onTaskCreate={onTaskCreate}
        />
    </div>;
};












