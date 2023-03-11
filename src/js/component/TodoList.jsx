import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [tareas, setTarea] = useState([]);
  const [idForDelete, setIdForDelete] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(
    "https://assets.breatheco.de/apis/fake/todos/user/nicoydani"
  );
  const [fetchUser, setFetchUser] = useState("nicoydani");

  useEffect(() => {
    fetch(`${fetchUrl}`)
      .then((res) => {
        if (res.status == 404) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        setTarea(res);
      })
      .catch((err) => handleCreateUser());
  }, [fetchUrl]);

  useEffect(() => {
    if (!tareas.length) return;
    fetch(`${fetchUrl}`, {
      method: "PUT",
      body: JSON.stringify(tareas),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => console.log("All is good"))
      .catch(() => console.log("uy uy uy"));
  }, [tareas]);

  useEffect(() => {
    if (!idForDelete) return;
    let tareasTemporal = tareas.filter((tarea) => {
      console.log(idForDelete, tarea.id);
      return idForDelete !== tarea.id;
    });
    setTarea(tareasTemporal);
  }, [idForDelete]);

  const handleCreateUser = () => {
    const listaObj = [
      {
        label: "4geeks",
        done: false,
        id: (Math.random() * 1000000).toFixed(3),
        texto: "ejemplo",
      },
    ];

    fetch(`${fetchUrl}`, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        return fetch(`${fetchUrl}`, {
          method: "PUT",
          body: JSON.stringify(listaObj),
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
      .then(() => setTarea(listaObj));
  };

  const handleSubmit = (event) => {
    if (!input.trim()) return;
    if (event.key === "Enter") {
      let objeto = {
        label: "4Geeks",
        done: false,
        id: (Math.random() * 1000000).toFixed(3),
        texto: input,
      };

      setTarea(tareas.concat(objeto));
      setInput("");
    }
  };

  const handleChangeUser = () => {
    let newURL = `https://assets.breatheco.de/apis/fake/todos/user/${fetchUser}`;
    console.log(fetchUser, newURL);
    setFetchUrl(newURL);
  };

  const handleDeleteUser = () => {
    if (fetchUser === "nicoydani") return;
    fetch(`${fetchUrl}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }).then(()=>{
      setFetchUrl("https://assets.breatheco.de/apis/fake/todos/user/nicoydani")
      setFetchUser("nicoydani")
    });
  };

  return (
    <>
      <div className="container">
        <div className="mb-3 text-center">
          <div className="d-flex flex-direction-row">
            <input
              type="text"
              onChange={(event) => setFetchUser(event.target.value)}
              value={fetchUser}
            />
            <button onClick={handleChangeUser}> ABRIR / CARGAR </button>
            <button onClick={handleDeleteUser}> Borrar </button>
          </div>

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
                  return (
                    <li key={element.id}>
                      {element.texto}{" "}
                      <div className="icono">
                        <i
                          className="fas fa-trash"
                          onClick={() => setIdForDelete(element.id)}
                        ></i>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
