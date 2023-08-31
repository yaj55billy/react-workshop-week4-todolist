import axios from "axios";

// todolist api
const todoBase = axios.create({
	baseURL: "https://todolist-api.hexschool.io",
});

// 註冊
export const apiUsersSignUp = (data) => todoBase.post("/users/sign_up", data);

// 登入
export const apiUsersSignIn = (data) => todoBase.post("/users/sign_in", data);

// 驗證
export const apiUsersCheckout = (headers) =>
	todoBase.get("/users/checkout", headers);

// 登出
export const apiUsersSignOut = (headers) =>
	todoBase.post("/users/sign_out", {}, headers);

// 取得所有待辦
export const apiGetTodos = (headers) => todoBase.get("/todos/", headers);

// 新增待辦
export const apiPostTodos = (data, headers) =>
	todoBase.post("/todos/", data, headers);

// 刪除待辦
export const apiDeleteTodos = (id, headers) =>
	todoBase.delete(`/todos/${id}`, headers);

// 切換待辦狀態
export const apiPatchTodos = (id, headers) =>
	todoBase.patch(`/todos/${id}/toggle`, {}, headers);

// 編輯待辦文字
export const apiPutTodos = (id, data, headers) =>
	todoBase.put(`/todos/${id}`, data, headers);
