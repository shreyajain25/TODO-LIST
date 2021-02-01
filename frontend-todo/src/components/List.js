import React, { useState } from "react";
import "./../styles/App.css";

function List(props)
{
        const [editTask, setEditTask] = useState(false);
        let [updatedtask, setUpdatedTask] = useState(props.task);
        let [update, setUpdate] = useState("");
	let [done, setDone] = useState(false);

	const editTaskInList = (e) => {
		setUpdate(e.target.value);
        }

        const updateTask = () => {
                if(update.trim().length > 0){
                        setUpdatedTask(update);
                        setEditTask(false);
                        setUpdate("");
                        props.onEdit(updatedtask, props.key);
                }
	}
        
	const isTaskToEdit = () =>{
                setEditTask(true);
        }

        const isTaskDone = (e) => {
                updatedtask.done = e.target.value;
                setDone(e.target.value);
        }

	return (
                <div className= "list">
                        <h3>{props.task.task}</h3>
                        {props.task.desc} - {props.task.date}

                        {editTask ? 
                        <React.Fragment>
                                <textarea className="editTask" onChange={editTaskInList} value={update}>
                                </textarea>
                                <button className="saveTask" onClick={updateTask} 
                                disabled={update.trim().length === 0}>
                                        Save
                                </button>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                                <input type="checkbox" value={done} onChange={isTaskDone}></input>
                                <button className="edit" onClick={isTaskToEdit}>Edit</button>
                                <button className="delete" onClick={() => {props.onDelete(props.key)}}>Delete</button>
                        </React.Fragment>}
                </div>
	);
}
export default List;