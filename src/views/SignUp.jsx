import Swal from "sweetalert2";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUsersSignUp } from "../api";

const SignUp = () => {
	const [isDisabled, setDisabled] = useState(false);
	const { register, handleSubmit, reset } = useForm();

	const resetHandle = () => {
		reset();
	};

	const navigate = useNavigate();

	const onSubmit = (data) => {
		setDisabled(true);
		apiUsersSignUp(data)
			.then(() => {
				Swal.fire({
					title: "恭喜註冊成功！",
					text: "為您導至登入頁...",
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
					title: "註冊失敗，請再檢查看看",
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
		<div id="sign-up" className="content">
			<div className="content__header">
				<h2 className="content__title">註冊帳號</h2>
			</div>
			<div className="content__body">
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<div className="form__item">
						<label className="form__label" htmlFor="signupEmail">
							Email
						</label>
						<input
							className="form__input"
							type="email"
							id="signupEmail"
							placeholder="請輸入 email"
							required
							{...register("email")}
						/>
					</div>
					<div className="form__item">
						<label className="form__label" htmlFor="nickname">
							您的暱稱
						</label>
						<input
							className="form__input"
							type="text"
							id="nickname"
							placeholder="請輸入您的暱稱"
							required
							{...register("nickname")}
						/>
					</div>

					<div className="form__item">
						<label className="form__label" htmlFor="signupPassword">
							密碼
						</label>
						<input
							className="form__input"
							type="password"
							id="signupPassword"
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
							註冊帳號
						</button>
					</div>
					<div className="text-center mt-3">
						已有帳號了？<NavLink to="/">登入</NavLink>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
