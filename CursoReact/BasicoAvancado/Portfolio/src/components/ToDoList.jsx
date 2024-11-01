import React from 'react';
import  Grid from '@mui/material/Grid';
import TaskInput from './TaskInput.jsx'
import TaskList from './TaskList.jsx';
import {useState, useEffect} from "react";

function ToDoList() {
  //  Will send the lists to list to be displayed
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  /*
  whenever a task is completed or removed, the data is persisted, stringfy 
  will transform the object or array into a string
  */
  useEffect(()=> {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks]);

  const addTask = (task, idSeq) => {
    
    //Selecting all tasks with a Spread and putting then into a new array.
    setTasks([...tasks, {id: Date.now() , text: task, done: false}]);
    
    //Save the task immediately after adding it.
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const deleteTask = (taskId) =>{
    setTasks(tasks.filter((task)=> task.id !== taskId));
  }

  const toggleTaskDone = (taskId) =>{
    /*
    The goal is to change the data that is in the tasks array.
    The Map is used to display data, or display modified data.
    We have an arrow function that checks if the id is equal to the sent id, if it is,
    it makes a modification, if not it does nothing
    */
    setTasks(
      tasks.map((task) => 
        task.id === taskId ? {...task, done: !task.done} : task
      )
    );
  }

  return (
    <div>
      <TaskInput onAddTask = {addTask}/>
      <TaskList 
        tasks= {tasks} 
        onDeleteTask= {deleteTask} 
        onToggleTaskDone= {toggleTaskDone}
      />
    </div>
  )
}

export default ToDoList;
