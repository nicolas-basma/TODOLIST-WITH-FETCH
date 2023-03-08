import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [tareas, setTarea] = useState([]);
  const [idForDelete, setIdForDelete] = useState([])

  const handleSubmit = (event) => {
    if(!input.trim()) return;
    if (event.key === "Enter") {
      let objeto = {
        id: (Math.random()*1000000).toFixed(3) ,
        texto: input,
      };

      setTarea(tareas.concat(objeto));
      setInput("");
    }
  };

  useEffect(()=>{
    if(!idForDelete) return;
    // console.log(`delete`,idForDelete)
    let tareasTemporal = tareas.filter((tarea)=>{
      console.log(idForDelete,tarea.id)
     return idForDelete !== tarea.id
    })

    setTarea(tareasTemporal)
  }, [idForDelete])

  return (
    <>
      <div className="container">
        <div className="mb-3 text-center">
          <h1>TODOS</h1>
          <ul className="mx-auto">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSubmit}
              type="text"
              className="text"
              id="create"
              placeholder="Add a Task..."
            />

            {tareas.length
              ? tareas.map((element) => {
                  return <li key={element.id}>{element.texto} <div className="icono"><i className="fas fa-trash" onClick={()=>setIdForDelete(element.id)}></i></div></li>;
                })
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
