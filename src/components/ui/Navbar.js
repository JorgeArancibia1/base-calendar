import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';

export const Navbar = () => {
	const { name } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div className='navbar navbar-dark bg-dark mb-4'>
			<span className='navbar-brand'>{name}</span>

			<button className='btn btn-outline-danger' onClick={handleLogout}>
				<i className='fas fa-sign-out-alt m-2'>Salir</i>
				<FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
			</button>
		</div>
	);
};
