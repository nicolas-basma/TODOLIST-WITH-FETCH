import React, { useState } from "react";

const TodoList = () => {
  const [input, setInput] = useState('');
  const [tarea, setTarea] = useState([]);

//   const handleCreateTarea = (event) => {
//     console.log(event.target.value);
//     setTarea(event.target.value);
//   };

  const handleSubmit = (event) => {
    if(event.key === 'Enter'){
        setTarea([...tarea, input])
        setInput('');
        
    }
  }

  return (
    <>
      <div className="container">
        <div className="mb-3">
            <h1>TODOS</h1>
            <form>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                console.log(input)}}
              onKeyDown={handleSubmit}
              type="text"
              className="text"
              id="create"
              placeholder="Add a Tarea"
            />
            </form>
            {tarea.length ? tarea.map((element, i)=>{
                return <h1 key={i}>{element}</h1>
            }):null}
        </div>
      </div>
    </>
  );
};

export default TodoList;
