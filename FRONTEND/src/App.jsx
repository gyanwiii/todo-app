// App.jsx

import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/TodoContext'
import './App.css'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])
  const [search, setSearch] = useState("")

  const API = "https://todo-app-1-aa9j.onrender.com/api/todos";

  const addTodo = async (todo) => {
    if (!todo || !todo.trim()) return;
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo }),
      });
      if (!res.ok) {
        throw new Error("Failed to add todo");
      }
      const data = await res.json();
      setTodos((prev) => [data, ...prev]);
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };
  const updateTodo = async (id, todo) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ todo })
    })
    const data = await res.json();
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo._id === id ? data : prevTodo
    ))
  }

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    })
    setTodos((prev) => prev.filter((todo) => todo._id != id))
  }

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/${id}/toggle`, {
      method: "PATCH",
    });
    const data = await res.json();
    setTodos((prev) => prev.map((prevTodo) => prevTodo._id === id ? data : prevTodo))
  }
  const filtered = (todos || []).filter(t =>
    t.todo?.toLowerCase().includes(search?.toLowerCase() || "")
  );
  //   const filtered = todos.filter(t =>
  // t.todo.toLowerCase().includes(search.toLowerCase())
  // );

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}>
      <div className='bg-[#172842] min-h-screen py-8'>
        <h1 className='text-center text-3xl font-bold text-white'>Todo App</h1>
        <div className='bg-[#FFFFFF] mt-6 p-2'><input className='text-black font-bold text-center border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg' placeholder="Search Todo" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
          <h1 className='text-2xl font-bold text-center mb-8 mt-2'>Manage your Todos</h1>
          <div className='mb-4'>
            <TodoForm />
          </div>
          <div className='flex flex-wrap gap-y-3'>
            {
              filtered.map((todo) => (
                <div key={todo._id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
