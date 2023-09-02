import axios from "axios";

// todolist api
export const todoBase = axios.create({
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
export const apiUsersSignOut = () => todoBase.post("/users/sign_out", {});

// 取得所有待辦
export const apiGetTodos = () => todoBase.get("/todos/");

// 新增待辦
export const apiPostTodos = (data) => todoBase.post("/todos/", data);

// 刪除待辦
export const apiDeleteTodos = (id) => todoBase.delete(`/todos/${id}`);

// 切換待辦狀態
export const apiPatchTodos = (id) => todoBase.patch(`/todos/${id}/toggle`, {});

// 編輯待辦文字
export const apiPutTodos = (id, data) => todoBase.put(`/todos/${id}`, data);
