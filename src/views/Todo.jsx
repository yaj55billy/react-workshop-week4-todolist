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
	apiUsersSignOut,
} from "../api";
import TodoItem from "../components/TodoItem";
import TodoCategory from "../components/TodoCategory";

const Todo = () => {
	const [todo, setTodo] = useState([]);
	const [todoType, setTodoType] = useState("all");
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
					title: "新增待辦成功",
				});
				getTodos();
			})
			.catch(() => {
				Toast.fire({
					icon: "error",
					title: "新增待辦失敗，請再檢查看看",
				});
			})
			.finally(() => {
				setInput(""); // 清空
				setTodoType("all"); // 將頁籤切換為「全部」
			});
	};

	// 刪除項目
	const deleteTodo = (id) => {
		apiDeleteTodos(id)
			.then(() => {
				Toast.fire({
					icon: "success",
					title: "刪除待辦成功",
				});
				getTodos();
			})
			.catch(() => {
				Toast.fire({
					icon: "error",
					title: "刪除待辦失敗，請再檢查看看",
				});
			});
	};

	// 切換狀態（是否完成）
	const toggleTodo = (id) => {
		apiPatchTodos(id)
			.then(() => {
				Toast.fire({
					icon: "success",
					title: "待辦狀態更新成功",
				});
				getTodos();
			})
			.catch(() => {
				Toast.fire({
					icon: "error",
					title: "待辦狀態更新失敗，請再檢查看看",
				});
			});
	};

	// 編輯項目
	const updateTodo = (id, content) => {
		apiPutTodos(id, { content })
			.then(() => {
				Toast.fire({
					icon: "success",
					title: "編輯待辦成功",
				});
				getTodos();
			})
			.catch(() => {
				Toast.fire({
					icon: "error",
					title: "編輯待辦失敗，請再檢查看看",
				});
			})
			.finally(() => {
				setEditTarget({});
			});
	};

	// 切換：全部、待完成、已完成
	const todoTypeChange = (status) => {
		setTodoType(status);
	};

	// 根據 todoType ，決定顯示要什麼資料
	const filterTodo = todo.filter((item) => {
		if (todoType === "completed") {
			return item.status;
		}
		if (todoType === "active") {
			return !item.status;
		}
		return true;
	});

	// 從原先 list 資料去 filter
	const todoUnCompleted = todo.filter((item) => {
		return !item.status;
	});

	// 清除已完成項目
	const clearTodoCompleted = () => {
		const result = todo.filter((item) => {
			if (item.status) {
				apiDeleteTodos(item.id);
			}
		});
		Promise.all(result).then(() => {
			Toast.fire({
				icon: "success",
				title: "清除已完成項目成功",
			});
			getTodos();
		});
	};

	// 登出
	const signOut = () => {
		apiUsersSignOut()
			.then(() => {
				document.cookie = "token=; expires=;";
				Swal.fire({
					title: "您已登出",
					text: "為您導回登入頁面...",
					icon: "success",
					showConfirmButton: false,
					timer: 1500,
				});
				setTimeout(() => {
					navigate("/");
				}, 1500);
			})
			.catch(() => {
				Swal.fire({
					title: "登出失敗，請再檢查看看",
					icon: "error",
					showConfirmButton: false,
					timer: 1500,
				});
			});
	};

	return (
		<>
			<div className="greet">
				<h4 className="greet__text">Hi~ {nickname}</h4>
				<button className="greet__btn" type="button" onClick={signOut}>
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
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										addTodo();
									}
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
							<TodoCategory
								todoType={todoType}
								todoTypeChange={todoTypeChange}
							/>

							<ul className="todo__list">
								{filterTodo.map((item) => {
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
									{todoUnCompleted.length} 個待完成項目
								</p>
								<button
									className="todo__bottom__btn"
									onClick={clearTodoCompleted}
								>
									清除已完成項目
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default Todo;
