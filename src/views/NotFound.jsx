import { NavLink } from "react-router-dom";
const NotFound = () => {
	return (
		<div className="notfound">
			<i className="notfound__icon fa-solid fa-ghost"></i>
			<h2 className="notfound__title">Oops...無此頁面</h2>
			<NavLink className="notfound__link" to="/">
				到登入頁
			</NavLink>
		</div>
	);
};

export default NotFound;
