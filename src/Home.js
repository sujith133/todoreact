import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import TaskCard from './Components/TaskCard';
import Cookies from "js-cookie";

const Home = () => {
  const [name, setName] = useState('');
  const id = Cookies.get('jwtToken');
  const [error, setError] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:3000/username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), 
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name); 
        } else {
          console.error('No user found');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsername();
  }, [id]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/gettasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), 
      });

      if (response.ok) {
        const data = await response.json();
        setTaskList(data.tasks); 
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);

  const [task, setTask] = useState('');
  const [taskBrief, setTaskBrief] = useState('');

  const changeTask = (event) => {
    setTask(event.target.value);
  };

  const changeTaskBrief = (event) => {
    setTaskBrief(event.target.value);
  };

  const taskCreated = async () => {
    if (task === '') {
      setError('Enter Task');
      return;
    }
    if (taskBrief === '') {
      setError('Enter Task Brief');
      return;
    }

    setError('');
    try {
      const response = await fetch('http://localhost:3000/addtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          task,
          taskBrief,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Task created:', data);
        setTask(''); 
        setTaskBrief(''); 
        fetchTasks(); 
      } else {
        const errorData = await response.json();
        setError('Failed to create Task: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while creating the task');
    }
  };

  return (
    <div style={{ width: '100%', paddingBottom: 30 }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <NavBar />
      </div>

      <h1 style={{ color: 'white', marginTop: 100 }}>Hello, {name}</h1>
      <div style={{ width: '100%', padding: 25, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h3">Create Task</Typography>
        <TextField
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          value={task}
          onChange={changeTask}
          style={{ marginBottom: 25, backgroundColor: 'white', width: '50%',minWidth:270 }}
        />
        <TextField
          id="outlined-basic"
          label="Task Brief"
          variant="outlined"
          value={taskBrief}
          onChange={changeTaskBrief}
          style={{ marginBottom: 25, backgroundColor: 'white',minWidth:270, width: '50%' }}
        />
        <Button variant="contained" style={{ width: 150 }} onClick={taskCreated}>Create Task</Button>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
      <Typography variant="h3">Your Tasks</Typography>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap:'wrap' }}>
        {taskList.map((taskItem) => (
          <TaskCard key={taskItem.id} task={taskItem} onTaskDeleted={fetchTasks()} /> 
        ))}
      </div>
    </div>
  );
};

export default Home;
