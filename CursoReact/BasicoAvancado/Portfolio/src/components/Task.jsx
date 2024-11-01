import Grid from '@mui/material/Grid2';
import "./ToDoList.css";

//Create a task
const Task = ({task, onDelete, onToggleDone }) => {
  return (
      <li className="li">
        <span 
        onClick={onToggleDone} 
        className="lispan"
        >
          {task.text}
        </span>
        <button className="button" onClick={onDelete}>Remove Task</button>
      </li>
  )
}
export default Task;