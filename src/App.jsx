import React, { Component, useState } from "react";
import ToDo from "./components/ToDo/ToDo";
import Completed from "./components/Completed/Completed";
import "./App.css";

let lastGeneratedKey = 0;

export default function App() {
	const [reminders, setReminders] = useState([]);
	const [allReminders, setAllReminders] = useState([]);
	const [completedReminders, setCompletedReminders] = useState([]);
	const [uncompletedReminders, setUncompletedReminders] = useState([]);
	const [Status, setStatus] = useState({
		all: true,
		completed: false,
		uncompleted: false,
	});
	const [newReminder, setNewReminder] = useState("");

	const showingReminders = () => {
		let arr = [];
		console.log("Status => ", Status);

		if (Status.all) {
			arr = allReminders;
		} else if (Status.completed) {
			arr = completedReminders;
		} else if (Status.uncompleted) {
			arr = uncompletedReminders;
		}
		setReminders(arr);
		console.log("arr => ", arr);
	};

	const changeNewReminderContent = (event) => {
		setNewReminder(event.target.value);
	};

	const addNewReminder = () => {
		const newRemind = {
			status: "uncompleted",
			task: newReminder,
			ID: lastGeneratedKey++,
		};
		allReminders.unshift(newRemind);
		uncompletedReminders.unshift(newRemind);
		setNewReminder("");
		showingReminders();
	};

	const markReminderAsCompleted = (reminderIndex) => {
		allReminders[reminderIndex].status = "completed";
		let CompletedReminders = allReminders.filter(
			(reminder) => reminder.status === "completed"
		);
		let UncompletedReminders = allReminders.filter(
			(reminder) => reminder.status === "uncompleted"
		);
		setCompletedReminders(CompletedReminders);
		setUncompletedReminders(UncompletedReminders);
		showingReminders();
	};

	const showAllReminders = () => {
		setStatus({ all: true, completed: false, uncompleted: false });
		showingReminders();
	};

	const showCompletedReminders = () => {
		setStatus({ all: false, completed: true, uncompleted: false });
		showingReminders();
	};

	const showUncompletedReminders = () => {
		setStatus({ all: false, completed: false, uncompleted: true });
		showingReminders();
	};

	const removeElement = (allReminderIndex, completedRemindersIndex) => {
		let all = allReminders;
		let completed = completedReminders;
		all.splice(allReminderIndex, 1);
		completed.splice(completedRemindersIndex, 1);
		setAllReminders(all);
		setCompletedReminders(completed);
		showingReminders();
	};

	let mainStyle = {
		height: "240px",
	};

	if (reminders.length >= 1) {
		mainStyle = {
			height: 240 + 21.5 * reminders.length,
		};
	}

	return (
		<div className="main" style={mainStyle}>
			<input
				type="text"
				className="Task"
				onChange={changeNewReminderContent}
				value={newReminder}
				placeholder="Enter Your New Task"
			/>
			<input
				className="addButton"
				type="button"
				onClick={addNewReminder}
				value="Add"
			/>
			{reminders.map((item) =>
				item.status === "completed" ? (
					<Completed
						key={item.ID}
						task={item.task}
						click={() =>
							removeElement(
								allReminders.indexOf(item),
								completedReminders.indexOf(item)
							)
						}
					/>
				) : (
					<ToDo
						key={item.ID}
						task={item.task}
						click={() =>
							setTimeout(
								() => markReminderAsCompleted(allReminders.indexOf(item)),
								500
							)
						}
					/>
				)
			)}

			<button className="all" onClick={showAllReminders}>
				All
			</button>
			<button className="all" onClick={showCompletedReminders}>
				Completed
			</button>
			<button className="all" onClick={showUncompletedReminders}>
				Uncompleted
			</button>
		</div>
	);
}
