import {useState} from "react";

//Will be add Task
const TaskInput = ({onAddTask}) => {
  const [input, setInput] = useState("");
  //Create a submit function that will be trigguered when the form is submitted.
  const handleSubmit = (e) =>{
    e.preventDefault();
    /*
    Checking to see if there is text.
    Using the trim method that cuts out empty spaces and gives you only the
    characters, if there are spaces between words it preserves them.
    If there is text after the trim, it means I have a new word
    */
    if(input.trim()){
      onAddTask(input);
      setInput("");
    }
  }
  return (
    <form onSubmit= {handleSubmit}>
      {/*Create anonymous function, that will be pass the event argument 
      that comes implicit */}
      <input type="text" 
        value= {input}
        onChange= {(e) => setInput(e.target.value)} 
        placeholder="Add a task." 
        className="input"
      />
      <button className="button" type = "submit">Add Task</button>
    </form>
  );
};
export default TaskInput;