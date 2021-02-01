import React, { useState } from "react";
import "./../styles/App.css";

function List(props)
{
        const [editTask, setEditTask] = useState(false);
        let [updatedtask, setUpdatedTask] = useState(props.task);
        let [update, setUpdate] = useState("");
        let [desc, setDesc] = useState("");
        let [date, setDate] = useState("");
	let [done, setDone] = useState(false);

	const editTaskInList = (e) => {
                setUpdate(e.target.value);
                updateTask.task = update;
        }

        const editDescToList = (e) => {
                setDesc(e.target.value);
                updateTask.desc = desc;
        }

        const editDateToList = (e) => {
                setDate(e.target.value);
                updateTask.date = date;
        }

        const updateTask = () => {
                if(update.trim().length > 0){
                        setUpdatedTask(update);
                        setEditTask(false);
                        setUpdate("");
                        props.onEdit(updatedtask, props.idx);
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
                                Task : <textarea className="editTask" onChange={editTaskInList} value={update}>
                                </textarea>
			        Description: <textarea id="desc" onChange={editDescToList} value={desc}></textarea>
			        Deadline: <input id="date" type="date"  onChange={editDateToList}></input>
                                <button className="saveTask" onClick={updateTask} 
                                disabled={update.trim().length === 0}>
                                        Save
                                </button>
                        </React.Fragment>
                        : 
                        <React.Fragment>
                                <input type="checkbox" value={done} onChange={isTaskDone}></input>
                                <button className="edit" onClick={isTaskToEdit}>Edit</button>
                                <button className="delete" onClick={() => {props.onDelete(props.idx)}}>Delete</button>
                        </React.Fragment>}
                </div>
	);
}
export default List;