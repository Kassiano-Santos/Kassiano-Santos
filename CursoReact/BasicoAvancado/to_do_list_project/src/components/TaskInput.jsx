import {useState} from "react";

//onde será adicionado a tarefa
const TaskInput = ({onAddTask}) => {
  const [input, setInput] = useState("");
  //criar uma função submit que é disparada quando o formulário é enviado
  const handleSubmit = (e) =>{
    /*utilização do eprevent Default para não enviar o formulário de forma 
    tradicional*/
    e.preventDefault();
    /*checando para ver se tem texto. 
    Utilizando o método trim que corta os espaços vazios e te dá apenas os 
    caracteres, caso tenha espaços entre as palavras ele preserva.
    Se houver texto depois do trim, é porque tenho uma palavra nova */
    if(input.trim()){
      onAddTask(input);
      setInput("");
    }
  }
  return (
    <form onSubmit= {handleSubmit}>
      {/*criar função anonima, passa o argumento de evento que vem implícito, 
      utiliza o set input e pega o target value */}
      <input type="text" 
      value= {input}
      onChange= {(e) => setInput(e.target.value)} 
      placeholder="Adicione uma tarefa." />
      <button type = "submit">Adicionar</button>
    </form>
  );
};
export default TaskInput;