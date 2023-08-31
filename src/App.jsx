import { Routes, Route, NavLink } from "react-router-dom";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";
import Todo from "./views/Todo.jsx";
// import { useState, useEffect } from "react";
// import SignOut from "./components/SignOut";

import "./App.css";

function App() {
	// const [token, setToken] = useState("");

	// const todoToken = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith("token="))
	// 	?.split("=")[1];

	// useEffect(() => {
	// 	if (todoToken) {
	// 		setToken(todoToken);
	// 	}
	// }, []);

	return (
		<>
			<nav>
				<NavLink to="/">註冊頁</NavLink>
				<NavLink to="/signin">登入頁</NavLink>
				<NavLink to="/todo">Todo頁</NavLink>
			</nav>
			<Routes>
				<Route path="/" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/todo" element={<Todo />} />
				{/* <Route path="*" element={<NotFound />}></Route> */}
			</Routes>
		</>
	);
}

export default App;
