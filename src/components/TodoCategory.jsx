import propTypes from "prop-types";
const TodoCategory = ({ todoType, todoTypeChange }) => {
	return (
		<div className="todo__category">
			<button
				className={`todo__category__list ${todoType === "all" ? "active" : ""}`}
				onClick={() => todoTypeChange("all")}
			>
				全部
			</button>
			<button
				className={`todo__category__list ${
					todoType === "active" ? "active" : ""
				}`}
				onClick={() => todoTypeChange("active")}
			>
				待完成
			</button>
			<button
				className={`todo__category__list ${
					todoType === "completed" ? "active" : ""
				}`}
				onClick={() => todoTypeChange("completed")}
			>
				已完成
			</button>
		</div>
	);
};
TodoCategory.propTypes = {
	todoType: propTypes.string.isRequired,
	todoTypeChange: propTypes.func.isRequired,
};
export default TodoCategory;
