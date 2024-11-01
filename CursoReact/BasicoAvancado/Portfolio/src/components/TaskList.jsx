// local onde o componente task será exibido algumas vezes
import React from "react";
import Task from './Task';
import  Grid from '@mui/material/Grid';

const TaskList = ({tasks, onDeleteTask, onToggleTaskDone}) => {
  if(tasks.length === 0) {
    return <p className="text">There are no registered tasks!</p>
  }
  return (
    <ul className="ul">
      {tasks.map((task)=>(
        <Task 
          key= {task.id} 
          task={task}
          onDelete={() => onDeleteTask(task.id)}
          onToggleDone= {()=> onToggleTaskDone(task.id)}
        />
      ))}
    </ul>
  )
}
export default TaskList;