import propTypes from "prop-types";
import { useState, useEffect } from "react";
import {
	apiUsersCheckout,
	apiGetTodos,
	apiPostTodos,
	apiDeleteTodos,
	apiPatchTodos,
	apiPutTodos,
} from "../api";
import TodoItem from "./TodoItem";

const Todo = ({ todoToken }) => {
	const [list, setList] = useState([]);
	const [filterType, setFilterType] = useState("all");
	const [input, setInput] = useState("");
	const [check, setCheck] = useState(false);
	const [nickname, setNickname] = useState("");
	const [editTarget, setEditTarget] = useState({});

	const headers = {
		Authorization: todoToken,
	};

	const checkLogin = () => {
		apiUsersCheckout({
			headers: {
				Authorization: todoToken,
			},
		})
			.then((res) => {
				setNickname(res.data.nickname);
				setCheck(true);
				getTodos();
			})
			.catch(() => {
				setCheck(false);
			});
	};

	useEffect(() => {
		checkLogin();
	}, [todoToken]);

	const getTodos = () => {
		apiGetTodos({ headers })
			.then((res) => {
				setList(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// 新增項目
	const addTodo = () => {
		if (input === "") return;
		apiPostTodos({ content: input }, { headers }).then((res) => {
			console.log(res);
		});

		setInput(""); // 清空
		getTodos();
	};

	// 刪除項目
	const deleteTodo = (id) => {
		apiDeleteTodos(id, { headers });
		getTodos();
	};

	// 切換狀態（是否完成）
	const toggleTodo = (id) => {
		apiPatchTodos(id, { headers });
		getTodos();
	};

	// 編輯項目
	const updateTodo = (id, content) => {
		apiPutTodos(id, { content }, { headers });
		setEditTarget({});
		getTodos();
	};

	// 切換 Filter 的狀態
	const filterChange = (status) => {
		setFilterType(status);
	};

	// 根據 FilterType ，決定顯示要什麼資料
	const filterList = list.filter((item) => {
		if (filterType === "completed") {
			return item.status;
		}
		if (filterType === "active") {
			return !item.status;
		}
		return true;
	});

	// 從原先 list 資料去 filter
	const listCompleted = list.filter((item) => {
		return item.status;
	});

	return (
		<div id="todoListPage" className="bg-yellow">
			<div className="container todoListPage">
				{check === false ? (
					<h2 className="not-login-text">操作待辦清單，請先登入~</h2>
				) : (
					<>
						<h2 className="formControls_txt">{nickname} 待辦清單</h2>
						<div className="todoList_Content">
							<div className="inputBox">
								<input
									type="text"
									placeholder="請輸入待辦事項"
									value={input}
									onChange={(e) => {
										setInput(e.target.value);
									}}
								/>
								<button type="button" onClick={addTodo}>
									<i className="fa fa-plus" />
								</button>
							</div>
							{list.length === 0 ? (
								<h3>目前沒有待辦事項，來新增吧！</h3>
							) : (
								<div className="todoList_list">
									<ul className="todoList_tab">
										<li>
											<button
												className={filterType === "all" ? "active" : ""}
												onClick={() => filterChange("all")}
											>
												全部
											</button>
										</li>
										<li>
											<button
												className={filterType === "active" ? "active" : ""}
												onClick={() => filterChange("active")}
											>
												待完成
											</button>
										</li>
										<li>
											<button
												className={filterType === "completed" ? "active" : ""}
												onClick={() => filterChange("completed")}
											>
												已完成
											</button>
										</li>
									</ul>
									<div className="todoList_items">
										<ul className="todoList_item">
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
										<div className="todoList_statistics">
											<p>{listCompleted.length} 個已完成項目</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

Todo.propTypes = {
	todoToken: propTypes.string.isRequired,
};

export default Todo;
