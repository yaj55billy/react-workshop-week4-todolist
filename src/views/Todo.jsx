import propTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
	apiUsersCheckout,
	apiGetTodos,
	apiPostTodos,
	apiDeleteTodos,
	apiPatchTodos,
	apiPutTodos,
} from "../api";
import TodoItem from "../components/TodoItem";

const Todo = () => {
	const [list, setList] = useState([]);
	const [filterType, setFilterType] = useState("all");
	const [input, setInput] = useState("");
	const [check, setCheck] = useState(false);
	const [nickname, setNickname] = useState("");
	const [editTarget, setEditTarget] = useState({});

	const todoToken = document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];

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

	/**
	 * 如果 check === false 則跳出 popup 通知使用者登入，並且有個登入導向
	 */

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
					{list.length === 0 ? (
						<h4 className="text-center">目前沒有待辦事項，來新增吧！</h4>
					) : (
						<div className="todo__content">
							<div className="todo__category">
								<button
									className={`todo__category__list ${
										filterType === "all" ? "active" : ""
									}`}
									onClick={() => filterChange("all")}
								>
									全部
								</button>
								<button
									className={`todo__category__list ${
										filterType === "active" ? "active" : ""
									}`}
									onClick={() => filterChange("active")}
								>
									待完成
								</button>
								<button
									className={`todo__category__list ${
										filterType === "completed" ? "active" : ""
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

Todo.propTypes = {
	todoToken: propTypes.string.isRequired,
};

export default Todo;
