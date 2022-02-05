import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { eventDeleted } from "../../redux/actions/events";

export const EventDeleteFab = () => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(eventDeleted());
	};
	return (
		<button className="btn btn-danger fab-danger" onClick={handleDelete}>
			<FontAwesomeIcon icon={faTrash} />
			<span>Borrar Evento</span>
		</button>
	);
};
