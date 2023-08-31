import { useState, useEffect } from "react";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import Todo from "./components/Todo";
import "./App.css";

function App() {
	const [token, setToken] = useState("");

	const todoToken = document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];

	useEffect(() => {
		if (todoToken) {
			setToken(todoToken);
		}
	}, []);

	return (
		<>
			<SignUp />
			<SignIn setToken={setToken} />
			<SignOut token={token} setToken={setToken} />
			<Todo todoToken={todoToken} />
		</>
	);
}

export default App;
