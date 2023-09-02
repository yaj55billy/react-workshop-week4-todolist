import { Routes, Route } from "react-router-dom";
import "./styles/all.sass";
import SignUp from "./views/SignUp.jsx";
import SignIn from "./views/SignIn.jsx";
import Todo from "./views/Todo.jsx";
import NotFound from "./views/NotFound";

function App() {
	return (
		<div className="main">
			<div className="container">
				<Routes>
					<Route path="/" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/todo" element={<Todo />} />
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
