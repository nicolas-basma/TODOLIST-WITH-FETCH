import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [tarea, setTarea] = useState([]);

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      let objeto = {
        id: Math.random(),
        texto: input,
      };

      setTarea(tarea.concat(objeto));
      setInput("");
      console.log(`enter`);
    }
  };


  return (
    <>
      <div className="container">
        <div className="mb-3">
          <h1>TODOS</h1>
          <ul>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSubmit}
              type="text"
              className="text"
              id="create"
              placeholder="Add a Tarea"
            />

            {tarea.length
              ? tarea.map((element) => {
                  return <li key={element.id}>{element.texto}</li>;
                })
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
