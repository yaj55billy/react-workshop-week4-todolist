import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUsersSignUp } from "../api";

const SignUp = () => {
	const {
		register, // state
		handleSubmit, // 處理 submit
	} = useForm(); // 從 useForm 這個功能解構出 register handleSubmit

	// const [message, setMessage] = useState("");
	// const [error, setError] = useState(false);

	const onSubmit = (data) => {
		apiUsersSignUp(data)
			.then(() => {
				// setMessage("恭喜註冊成功~");
				// setError(false);
			})
			.catch(() => {
				// setMessage("註冊失敗，請再檢查是否有註冊過~");
				// setError(true);
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

					{/* <p className={`mt-1 ${error ? "error-text" : "success-text"}`}>
						{message}
					</p> */}
					<div className="text-center mt-6">
						<button className="form__button" type="submit">
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
