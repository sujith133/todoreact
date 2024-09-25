import { Button, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from "react";

const TaskCard = (props) => {
    const { task, onTaskDeleted } = props; 
    const { name: taskname, brief: taskbrief, state: taskState, id } = task;
    const [state, setState] = useState(taskState);

    const stateChange = async (event) => {
        const newState = event.target.value;
        setState(newState);

        try {
            const response = await fetch('http://localhost:3000/updatetaskstate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, state: newState }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to update task state:', errorData);
            }
        } catch (error) {
            console.error('Error updating task state:', error);
        }
    };

    const deleteTask = async () => {
        try {
            const response = await fetch('http://localhost:3000/deletetask', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                onTaskDeleted(); 
            } else {
                const errorData = await response.json();
                console.error('Failed to delete task:', errorData);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div id={id} style={{ backgroundColor: '#999', borderRadius: 15,marginBottom:20, padding: 15, width: 250, height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            <Typography variant="h4">{taskname}</Typography>
            <Typography variant="body1">{taskbrief}</Typography>
            <div>
                <Typography variant="body1">Status</Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    onChange={stateChange}
                    style={{ backgroundColor: 'white' }}
                >
                    <MenuItem value={'Pending'}>Pending</MenuItem>
                    <MenuItem value={'Processing'}>In Progress</MenuItem>
                    <MenuItem value={'Done'}>Done</MenuItem>
                    <MenuItem value={'Completed'}>Completed</MenuItem>
                </Select>
            </div>
            <Button variant="text" style={{ marginLeft: 'auto', color: 'red' }} onClick={deleteTask}>
                Delete
            </Button>
        </div>
    );
};

export default TaskCard;
