import React, { Component, useEffect, useState } from "react";
import "./todolist.css";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, editTodo, removeTodo } from "../redux/Slice/TodoSlice";

const TodoList = () => {

    const todos = useSelector(state => state.todos.value);
    const dispatch = useDispatch();

    const [todo, setTodo] = useState('');
    const [editId, setEditId] = useState(null);
    const [editInput, setEditInput] = useState(null);

    useEffect(() => {
        dispatch(fetchTodos())
    },[dispatch])

    const handleSubmit = () => {
        const newItem = {
            content: todo
        }

        try{
            dispatch(addTodo(newItem))
            setTodo("")
        }
        catch(e){
            console.log("error: ", e)
        }
    }

    const handleEdit = async (id) => {

        if(editId === null){
            setEditId(id);
            const updatedContent = todos.find((todo) => todo.id === id).content;
            setEditInput(updatedContent)
        }
        else{
            try{
                dispatch(editTodo({id, content: {content: editInput}}))
                setEditId(null)
                setEditInput(null)                
            }
            catch(e){
                console.log("Error: ", e)
            }
        }

    }

    const handleDelete = async (id) => {

        try{
            dispatch(removeTodo({id:id}))
        }
        catch(e){
            console.log("Error: ",e )
        }


    }
    return (
        <div className="todo-container">
          <div className="form-container">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button onClick={handleSubmit}>submit</button>
          </div>
  
          <div className="list-container">
            <ul>
              {todos.map((item, index) => {
                const isEdit = item.id === editId;
                return (
                  <li key={item.id}>
                    {/* conditional rendering */}
                    {isEdit ? (
                      <input
                        value={editInput}
                        onChange={(e) =>
                          setEditInput(e.target.value)
                        }
                      />
                    ) : (
                      <span>{item.content}</span>
                    )}
  
                    {/* replace span */}
                    <div className="todo-action">
                      <button onClick={() => handleEdit(item.id)}>
                        {editId === item.id ? "save" : "edit"}
                        {/* save */}
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
}

export default TodoList;