import propTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form"; // 從 react-hook-form 引出 useFrom 這個功能
import { apiUsersSignIn } from "../api";

const SignIn = ({ setToken }) => {
	const {
		register, // state
		handleSubmit, // 處理 submit
	} = useForm(); // 從 useForm 這個功能解構出 register handleSubmit
	// const [message, setMessage] = useState("");
	// const [error, setError] = useState(false);

	const onSubmit = (data) => {
		apiUsersSignIn(data)
			.then((res) => {
				const { token } = res.data;
				const tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				document.cookie = `token=${token};expires=${tomorrow.toUTCString()}`;
				setToken(token);
				// setMessage("登入成功~，token: " + token);
				// setError(false);
			})
			.catch(() => {
				// setMessage("登入失敗，請檢查帳密是否正確，或是否有註冊過了~");
				// setError(true);
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
					{/* <p
						className={`mt-1 break-all ${
							error ? "error-text" : "success-text"
						}`}
					>
						{message}
					</p> */}
					<div className="text-center mt-6">
						<button className="form__button" type="submit">
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

SignIn.propTypes = {
	setToken: propTypes.func.isRequired,
};

export default SignIn;
