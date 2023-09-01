import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
	apiUsersCheckout,
	apiGetTodos,
	apiPostTodos,
	apiDeleteTodos,
	apiPatchTodos,
	apiPutTodos,
	todoBase,
} from "../api";
import TodoItem from "../components/TodoItem";

const Todo = () => {
	const [todo, setTodo] = useState([]);
	const [filterTodo, setFilterTodo] = useState("all");
	const [input, setInput] = useState("");
	const [nickname, setNickname] = useState("");
	const [editTarget, setEditTarget] = useState({});

	const navigate = useNavigate();

	const todoToken = document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];

	const checkLogin = () => {
		apiUsersCheckout({
			headers: {
				Authorization: todoToken,
			},
		})
			.then((res) => {
				setNickname(res.data.nickname);
				todoBase.defaults.headers.common["Authorization"] = todoToken;
				getTodos();
			})
			.catch(() => {
				Swal.fire({
					title: "驗證失敗，請先登入",
					text: "稍後導至登入頁",
					icon: "error",
					showConfirmButton: false,
					timer: 1500,
				});
				setTimeout(() => {
					navigate("/");
				}, 1500);
			});
	};

	useEffect(() => {
		checkLogin();
	}, []);

	const getTodos = () => {
		apiGetTodos()
			.then((res) => {
				setTodo(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		customClass: {
			popup: "colored-toast",
		},
		timer: 1500,
		timerProgressBar: true,
	});

	// 新增項目
	const addTodo = () => {
		if (input === "") return;
		apiPostTodos({ content: input })
			.then(() => {
				Toast.fire({
					icon: "success",
					title: "新增成功",
				});
			})
			.catch(() => {
				Toast.fire({
					icon: "error",
					title: "新增失敗，請再檢查看看",
				});
			});

		setInput(""); // 清空
		getTodos();
	};

	// 刪除項目
	const deleteTodo = (id) => {
		apiDeleteTodos(id);
		getTodos();
	};

	// 切換狀態（是否完成）
	const toggleTodo = (id) => {
		apiPatchTodos(id);
		getTodos();
	};

	// 編輯項目
	const updateTodo = (id, content) => {
		apiPutTodos(id, { content });
		setEditTarget({});
		getTodos();
	};

	// 切換 Filter 的狀態
	const filterChange = (status) => {
		setFilterTodo(status);
	};

	// 根據 FilterType ，決定顯示要什麼資料
	const filterList = todo.filter((item) => {
		if (filterTodo === "completed") {
			return item.status;
		}
		if (filterTodo === "active") {
			return !item.status;
		}
		return true;
	});

	// 從原先 list 資料去 filter
	const listCompleted = todo.filter((item) => {
		return item.status;
	});

	return (
		<>
			<div className="greet">
				<h4 className="greet__text">Hi~ {nickname}</h4>
				<button className="greet__btn" type="button">
					登出
				</button>
			</div>

			<div id="todolist" className="content">
				<div className="content__header">
					<h2 className="content__title">待辦清單</h2>
				</div>
				<div className="content__body">
					<div className="form__item">
						<div className="flex">
							<input
								className="form__input"
								type="text"
								placeholder="請輸入待辦事項"
								value={input}
								onChange={(e) => {
									setInput(e.target.value);
								}}
							/>
							<button className="todo__addbtn" type="button" onClick={addTodo}>
								<i className="fa fa-plus" />
							</button>
						</div>
					</div>
					{todo.length === 0 ? (
						<h4 className="text-center">目前沒有待辦事項，來新增吧！</h4>
					) : (
						<div className="todo__content">
							<div className="todo__category">
								<button
									className={`todo__category__list ${
										filterTodo === "all" ? "active" : ""
									}`}
									onClick={() => filterChange("all")}
								>
									全部
								</button>
								<button
									className={`todo__category__list ${
										filterTodo === "active" ? "active" : ""
									}`}
									onClick={() => filterChange("active")}
								>
									待完成
								</button>
								<button
									className={`todo__category__list ${
										filterTodo === "completed" ? "active" : ""
									}`}
									onClick={() => filterChange("completed")}
								>
									已完成
								</button>
							</div>
							<ul className="todo__list">
								{filterList.map((item) => {
									return (
										<TodoItem
											key={item.id}
											id={item.id}
											content={item.content}
											status={item.status}
											toggleTodo={toggleTodo}
											deleteTodo={deleteTodo}
											editTarget={editTarget}
											setEditTarget={setEditTarget}
											updateTodo={updateTodo}
										/>
									);
								})}
							</ul>
							<div className="todo__bottom">
								<p className="todo__bottom__text">
									{listCompleted.length} 個已完成項目
								</p>
								<button className="todo__bottom__btn">清除已完成項目</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default Todo;
