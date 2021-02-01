import React, { useState, useEffect } from "react";
import "./../styles/App.css";
import List from '../components/List';

function App() {
	let [tasks, setTask] = useState([]);
	let [newTask, setNewTask] = useState("");
	let [desc, setDesc] = useState([]);
	let [newDesc, setNewDesc] = useState("");
	let [date, setDate] = useState([]);
	let [newDate, setNewDate] = useState("");
	let [createdAt, setcreatedAt] = useState("");

	useEffect(() => 
		{
			fetch("http://localhost:9000/showTask", {
				method: "GET",
				headers: {"ContentType": "application/json",}
			})
			.then((res) => res.json())
			.then((res) => { 
				res.map((val) => {
					console.log(val);
					tasks.push(val);
					})
				setTask([...tasks])
			 });
		}, []
	)

	const addTask = (event) => {
		event.preventDefault();
		tasks.push(newTask);
		setTask([...tasks]);

		desc.push(newDesc);
		setDesc([...desc]);

		date.push(newDate);
		setDate([...date]);
		
		fetch("http://localhost:9000/addTask", {
			method: "POST",
			headers: {"Content-Type": "application/json",},
			body: JSON.stringify({taskname: newTask,
				description: newDesc,
				deadline: newDate})
		})
		.then((res) => res.json())
		.then((res) => { setcreatedAt(res.createdAt) });

		setNewTask("");
		setNewDesc("");
		setNewDate("");
	}

	const addTaskToList = (e) => {
		setNewTask(e.target.value);
	}

	const addDescToList = (e) => {
		setNewDesc(e.target.value);
	}

	const addDateToList = (e) => {
		setNewDate(e.target.value);
	}

	const editHandler = (editedValue, taskId) => {
		fetch("http://localhost:9000/updateTask", {
			method: "PUT",
			headers: {"ContentType": "application/json",},
			body: JSON.stringify({taskname: newTask,
				description: editedValue.desc,
				deadline: editedValue.date,
				done: editedValue.done,
				createdAt: taskId})
		})
		.then((res) => res.json())
		.then((res) => { console.log(res) });
		tasks[taskId] = editedValue;
		setTask([...tasks]);
	}

	const deleteHandler = (taskId) => {
		fetch("http://localhost:9000/deleteTask", {
			method: "DELETE",
			headers: {"ContentType": "application/json",
				"createdAt": createdAt}
		})
		.then((res) => res.json())
		.then((res) => { console.log(res) });
		tasks.splice(taskId, 1);
		setTask([...tasks]);
	}

	return (
		<div id="main">
			<h1>ADD TASKS TO YOUR TO DO LIST</h1>
			Task : <textarea type="text" id="task" onChange={addTaskToList} value={newTask}></textarea>
			Description: <textarea id="desc" onChange={addDescToList} value={newDesc}></textarea>
			Deadline: <input id="date" type="date"  onChange={addDateToList}></input>
			<button id="btn" onClick={addTask} disabled={newTask.trim().length === 0}>Add Task</button>
			{tasks.map((task, idx) => {
				return <List task={{task: task.taskname, desc: task.description, date: task.deadline}} key={`${tasks.createdAt}`} idx={idx} onDelete={deleteHandler} onEdit={editHandler} />
			})}
		</div>
	);
}

export default App;
