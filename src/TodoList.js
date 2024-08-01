import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
        headers: { 'x-access-token': token }
      });
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, { description, status }, {
        headers: { 'x-access-token': token }
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div>
      <h2>To-Do List</h2>
      <form onSubmit={handleCreateTodo}>
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add To-Do</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.description} - {todo.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
