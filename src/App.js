import React, { useEffect, useState } from 'react';
import List from './components/List';
import axios from 'axios';
import { baseURL } from './utils/constant';
// import { updateTask } from '../../backend/Controllers/TasksController';

const App = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTasks = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      setInput('');
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (text, id) => {
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      setUpdateUI((prevState) => !prevState);
      setUpdateId(null);
      setInput('');
    });
  };

  return (
    <main className="container">
      <h1 className="title">CRUD Operations</h1>
      <div className="input-holder">
        <input
          type="text"
          placeholder="Enter your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn"
          type="submit"
          onClick={updateId ? updateTask : addTasks}
        >
          {updateId ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
