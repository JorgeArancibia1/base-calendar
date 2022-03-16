import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';

export const AddNewFab = () => {
	const dispatch = useDispatch();

	const handleClickNew = () => {
		dispatch(uiOpenModal());
	};

	return (
		<button type='button' className='btn btn-primary fab' onClick={handleClickNew}>
			<FontAwesomeIcon icon={faPlus} />
		</button>
	);
};
