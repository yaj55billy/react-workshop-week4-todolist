import { useState } from "react";
import { useForm } from "react-hook-form"; // 從 react-hook-form 引出 useFrom 這個功能
import { apiUsersSignUp } from "../api";

const SignUp = () => {
	const {
		register, // state
		handleSubmit, // 處理 submit
	} = useForm(); // 從 useForm 這個功能解構出 register handleSubmit

	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);

	const onSubmit = (data) => {
		apiUsersSignUp(data)
			.then(() => {
				setMessage("恭喜註冊成功~");
				setError(false);
			})
			.catch(() => {
				setMessage("註冊失敗，請再檢查是否有註冊過~");
				setError(true);
			});
	};

	return (
		<div id="signUpPage" className="bg-yellow">
			<div className="container signUpPage">
				<div>
					<form
						className="formControls"
						action=""
						onSubmit={handleSubmit(onSubmit)}
					>
						<h2 className="formControls_txt">註冊帳號</h2>
						<label className="formControls_label" htmlFor="signupEmail">
							Email
						</label>
						<input
							className="formControls_input"
							type="email"
							id="signupEmail"
							placeholder="請輸入 email"
							required
							{...register("email")}
						/>

						<label className="formControls_label" htmlFor="nickname">
							您的暱稱
						</label>
						<input
							className="formControls_input"
							type="text"
							id="nickname"
							placeholder="請輸入您的暱稱"
							required
							{...register("nickname")}
						/>

						<label className="formControls_label" htmlFor="signupPassword">
							密碼
						</label>
						<input
							className="formControls_input"
							type="password"
							id="signupPassword"
							placeholder="請輸入密碼"
							required
							{...register("password")}
						/>
						<p className={`mt-1 ${error ? "error-text" : "success-text"}`}>
							{message}
						</p>
						<button className="formControls_btnSubmit" type="submit">
							註冊帳號
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
