import propTypes from "prop-types";
import { useState } from "react";
import { apiUsersSignOut } from "../api";

const SignOut = ({ token, setToken }) => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		apiUsersSignOut({
			headers: {
				Authorization: token,
			},
		})
			.then((res) => {
				setMessage(res.data.message);
				setError(false);
				setToken("");
				document.cookie = "token=; expires=;";
			})
			.catch((err) => {
				setMessage("登出失敗," + err.message);
				setError(true);
			});
	};

	return (
		<div id="loginPage" className="bg-yellow">
			<div className="container loginPage">
				<div>
					<form className="formControls" action="" onSubmit={onSubmit}>
						<h2 className="formControls_txt">登出</h2>
						<label className="formControls_label" htmlFor="signOutToken">
							Token
						</label>
						<input
							className="formControls_input"
							type="text"
							id="signOutToken"
							placeholder="請輸入 token"
							required
							value={token}
							onChange={(e) => {
								setToken(e.target.value);
							}}
						/>
						<p className={`mt-1 ${error ? "error-text" : "success-text"}`}>
							{message}
						</p>
						<button className="formControls_btnSubmit" type="submit">
							登出
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
SignOut.propTypes = {
	token: propTypes.string.isRequired,
	setToken: propTypes.func.isRequired,
};
export default SignOut;
