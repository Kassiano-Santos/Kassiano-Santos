// local onde o componente task será exibido algumas vezes
import React from "react";
import Task from '../../../to_do_list_project/src/components/task';


const TaskList = ({tasks, onDeleteTask, onToggleTaskDone}) => {
  if(tasks.length === 0) {
    return <p>Não há tarefas cadastradas!</p>
  }
  return (
    <ul>
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