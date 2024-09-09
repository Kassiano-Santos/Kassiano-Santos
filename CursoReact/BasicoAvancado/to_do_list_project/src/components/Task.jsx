//criacao da tarefa
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
      <button onClick={onDelete}>Remover</button>
    </li>
  )
}
export default Task;