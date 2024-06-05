import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getTodos, createTodo, updateTodo, deleteTodo  } from "../../APIs/todoAPIs"
import { act } from "react";


const initialState = {
    value: []
}

const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const response = await getTodos();
        console.log("In fetch todos: ", response)
        return response;
    }
)

const addTodo = createAsyncThunk(
    "todos/addTodo",
    async(payload) => {
        const response = await createTodo(payload);

        console.log(response);
        return response;
    }
)

const editTodo = createAsyncThunk("todos/editTodo",async (payload) => {

    const response = await updateTodo(payload.id, payload.content);

    console.log(response);

    return response
})

const removeTodo = createAsyncThunk("todos/removeTodo", async (payload) => {
    const response = await deleteTodo(payload.id)

    console.log("Remove todo: ", response);

    return response
})

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.value =  action.payload;
        })
        .addCase(addTodo.fulfilled, (state, action) => {
            state.value.push(action.payload)
        })
        .addCase(removeTodo.fulfilled, (state, action) => {
            state.value = state.value.filter((todo) => todo.id !== action.payload.id)
        })
        .addCase(editTodo.fulfilled, (state, action) => {
            state.value = state.value.map((todo) => {
                if(todo.id === action.payload.id){
                    return {...todo, content: action.payload.content}
                }
                else{
                    return todo;
                }
            })
        } )
    }
})

export {fetchTodos, addTodo, editTodo, removeTodo};

export default todoSlice.reducer;