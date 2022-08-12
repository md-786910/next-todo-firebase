import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, database } from "../firebseConfig";
import { useRouter } from "next/router";

const Todo = () => {
  const router = useRouter();
  const auth = getAuth();
  const [title, setTitle] = useState({
    title: "",
    isCompleted: false,
  });
  const [user, setUser] = useState([]);
  const [todos, setTodos] = useState([]);

  //   let uid = localStorage.getItem("token");
  //   let uid = localStorage.getItem("token") == null ? router.push("/") : "";
  let collectionRef;
  let uid;
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token")) !== null) {
      uid = JSON.parse(localStorage.getItem("token"));
      collectionRef = collection(database, uid);
    } else {
      collectionRef = collection(database, "testUser");
    }
  });

  // handle text input
  const handleText = (e) => {
    const value = e.target.value;
    setTitle({ title: value, isCompleted: false });
  };

  // add todo
  const addTodo = () => {
    if (title.title) {
      addDoc(collectionRef, {
        title: title.title,
        isCompleted: title.isCompleted,
      })
        .then((resp) => {
          alert("successfully added");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("please add a title 😎:");
    }
    setTitle({ title: "" });
  };

  const handleCheckBox = (e) => {
    const value = e.target.value;
    const id = value;

    const docRef = doc(database, uid, id);

    getDoc(docRef)
      .then((doc) => {
        const singleData = doc.data();
        updateDoc(docRef, {
          title: singleData.title,
          isCompleted: singleData.isCompleted
            ? !singleData.isCompleted
            : !singleData.isCompleted,
        })
          .then(() => {
            // alert("Updated")
          })
          .catch((err) => {
            alert("Failed to update");
          });
      })
      .catch((err) => {
        alert("Error.message");
      });
  };

  // delete todo
  const deleteTodo = (id) => {
    const docDelete = doc(database, uid, id);
    deleteDoc(docDelete)
      .then(() => {
        return;
      })
      .catch(() => {
        alert("Error.message");
      });
  };

  // user logout
  const userLogout = () => {
    signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    onSnapshot(collectionRef, (resp) => {
      const todos = resp.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setTodos(todos);
    });

    onAuthStateChanged(auth, (data) => {
      if (data) {
        setUser({
          email: data.email,
          name: data.displayName,
          image: data.photoURL,
        });

        if (JSON.parse(localStorage.getItem("token")) == null) {
          localStorage.setItem("token", JSON.stringify(data.email));
        } else {
          const matchEmail = JSON.parse(localStorage.getItem("token"));
          if (data.email === matchEmail) {
            return;
          } else {
            localStorage.setItem("token", JSON.stringify(data.email));
          }
        }
      } else {
        router.push("/");
      }
    });
  }, []);

  return (
    <>
      <div className="fluid-container">
        <div className="todoCard mt-3 p-3">
          <div className="inputText">
            <h1>Add Todo:➕</h1>
            <div className="input-group mt-3">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
              <input
                type="text"
                name="title"
                value={title.title}
                className="form-control "
                placeholder="
                         This is tea."
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleText}
              />
            </div>

            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={() => addTodo()}
            >
              Add Todos
            </button>

            <div className="userData border border-2 mt-5 p-2 text-center ">
              <img src={user.image} alt="user" />
              <div className="displayName">
                <h3>{user.name}</h3>
                <h5>{user.email}</h5>
              </div>

              <div
                className="btnLogout btn btn-success"
                style={{ padding: "10px" }}
                onClick={() => userLogout()}
              >
                logout
              </div>
            </div>
          </div>
          <div className="listTodo ">
            <h1>Your Todos:🔥</h1>
            <div className="todos mt-3 ">
              {todos &&
                todos.map((todo, index) => {
                  return (
                    <div className="todoCardItems" key={todo.id}>
                      <div className="todoFans">
                        <span className="badge bg-secondary">{index + 1}</span>

                        <div className="form-check mx-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="check"
                            value={todo.id}
                            id="flexCheckDefault"
                            onChange={handleCheckBox}
                            checked={todo.isCompleted}
                          />
                        </div>
                        <div className="titleTodos">
                          <h5
                            className={
                              todo.isCompleted
                                ? "text-decoration-line-through"
                                : "text-decoration-none"
                            }
                          >
                            {todo.title}
                          </h5>
                        </div>
                      </div>
                      <div className="btn" onClick={() => deleteTodo(todo.id)}>
                        ❎
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
