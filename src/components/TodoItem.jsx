import propTypes from "prop-types";

const TodoItem = ({
	id,
	content,
	status,
	toggleTodo,
	deleteTodo,
	editTarget,
	setEditTarget,
	updateTodo,
}) => {
	const atChange = () => {
		toggleTodo(id);
	};
	const atClickDelete = () => {
		deleteTodo(id);
	};
	const atClickEdit = (id, content) => {
		updateTodo(id, content);
	};

	return (
		<li>
			<label className="todoList_label" htmlFor={id}>
				<input
					className="todoList_input"
					type="checkbox"
					id={id}
					checked={status}
					onChange={atChange}
				/>
				{editTarget.id === id ? (
					<input
						type="text"
						value={editTarget.content}
						onChange={(e) => {
							setEditTarget({ ...editTarget, content: e.target.value });
						}}
					/>
				) : (
					<span>{content}</span>
				)}
			</label>
			<button type="button" className="edit-btn">
				{editTarget.id === id ? (
					<i
						className="fa-solid fa-check"
						onClick={() => atClickEdit(editTarget.id, editTarget.content)}
					></i>
				) : (
					<i
						className="fa-regular fa-pen-to-square"
						onClick={() => {
							setEditTarget({ id, content });
						}}
					></i>
				)}
			</button>
			<button type="button" className="delete-btn" onClick={atClickDelete}>
				<i className="fa fa-times" />
			</button>
		</li>
	);
};

TodoItem.propTypes = {
	id: propTypes.string.isRequired,
	content: propTypes.string.isRequired,
	status: propTypes.bool.isRequired,
	toggleTodo: propTypes.func.isRequired,
	deleteTodo: propTypes.func.isRequired,
	editTarget: propTypes.object.isRequired,
	setEditTarget: propTypes.func.isRequired,
	updateTodo: propTypes.func.isRequired,
};

export default TodoItem;
