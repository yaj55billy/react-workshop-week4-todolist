import Swal from "sweetalert2";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUsersSignIn } from "../api";

const SignIn = () => {
	const [isDisabled, setDisabled] = useState(false);
	const { register, handleSubmit, reset } = useForm();

	const resetHandle = () => {
		reset();
	};

	const navigate = useNavigate();

	const onSubmit = (data) => {
		setDisabled(true);
		apiUsersSignIn(data)
			.then((res) => {
				const { token } = res.data;
				const tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				document.cookie = `token=${token};expires=${tomorrow.toUTCString()}`;
				Swal.fire({
					title: "登入成功！",
					text: "為您導至 Todo 頁面...",
					icon: "success",
					showConfirmButton: false,
					timer: 1500,
				});
				setTimeout(() => {
					navigate("/todo");
				}, 1500);
			})
			.catch(() => {
				Swal.fire({
					title: "登入失敗",
					text: "請檢查帳密是否正確，或是否有註冊過。",
					icon: "error",
					showConfirmButton: false,
					timer: 1500,
				});
			})
			.finally(() => {
				setDisabled(false);
				resetHandle();
			});
	};

	return (
		<div id="sign-in" className="content">
			<div className="content__header">
				<h2 className="content__title">您的生活助理</h2>
			</div>
			<div className="content__body">
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<div className="form__item">
						<label className="form__label" htmlFor="signinEmail">
							Email
						</label>
						<input
							className="form__input"
							type="email"
							id="signinEmail"
							placeholder="請輸入 email"
							required
							{...register("email")}
						/>
					</div>
					<div className="form__item">
						<label className="form__label" htmlFor="signinPassword">
							密碼
						</label>
						<input
							className="form__input"
							type="password"
							id="signinPassword"
							placeholder="請輸入密碼"
							required
							{...register("password")}
						/>
					</div>
					<div className="text-center mt-6">
						<button
							className="form__button"
							type="submit"
							disabled={isDisabled}
						>
							登入
						</button>
					</div>
					<div className="text-center mt-3">
						還沒有帳號？<NavLink to="/signup">註冊</NavLink>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
