import propTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form"; // 從 react-hook-form 引出 useFrom 這個功能
import { apiUsersSignIn } from "../api";

const SignIn = ({ setToken }) => {
	const {
		register, // state
		handleSubmit, // 處理 submit
	} = useForm(); // 從 useForm 這個功能解構出 register handleSubmit
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);

	const onSubmit = (data) => {
		apiUsersSignIn(data)
			.then((res) => {
				const { token } = res.data;
				const tomorrow = new Date();
				tomorrow.setDate(tomorrow.getDate() + 1);
				document.cookie = `token=${token};expires=${tomorrow.toUTCString()}`;
				setToken(token);
				setMessage("登入成功~，token: " + token);
				setError(false);
			})
			.catch(() => {
				setMessage("登入失敗，請檢查帳密是否正確，或是否有註冊過了~");
				setError(true);
			});
	};

	return (
		<div id="loginPage" className="bg-yellow">
			<div className="container loginPage">
				<div>
					<form
						className="formControls"
						action=""
						onSubmit={handleSubmit(onSubmit)}
					>
						<h2 className="formControls_txt">登入</h2>
						<label className="formControls_label" htmlFor="signinEmail">
							Email
						</label>
						<input
							className="formControls_input"
							type="email"
							id="signinEmail"
							placeholder="請輸入 email"
							required
							{...register("email")}
						/>
						<label className="formControls_label" htmlFor="signinPassword">
							密碼
						</label>
						<input
							className="formControls_input"
							type="password"
							id="signinPassword"
							placeholder="請輸入密碼"
							required
							{...register("password")}
						/>
						<p
							className={`mt-1 break-all ${
								error ? "error-text" : "success-text"
							}`}
						>
							{message}
						</p>
						<button className="formControls_btnSubmit" type="submit">
							登入
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

SignIn.propTypes = {
	setToken: propTypes.func.isRequired,
};

export default SignIn;
