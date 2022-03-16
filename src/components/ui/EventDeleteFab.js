import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../redux/actions/events';

export const EventDeleteFab = () => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(eventStartDelete());
	};
	return (
		<button type='button' className='btn btn-danger fab-danger' onClick={handleDelete}>
			<FontAwesomeIcon icon={faTrash} />
			<span>Borrar Evento</span>
		</button>
	);
};
