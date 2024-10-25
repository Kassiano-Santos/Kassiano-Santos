//Create a task
import React from "react";

const Task = ({task, onDelete, onToggleDone }) => {

  return (
    <li>
      <span 
      onClick={onToggleDone} 
      style={{textDecoration: task.done? "line-through": "none"}}
      >
        {task.text}
      </span>
      <button onClick={onDelete}>Remove Task</button>
    </li>
  )
}
export default Task;