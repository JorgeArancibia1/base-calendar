import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { startChecking } from '../redux/actions/auth';
import { useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
	const dispatch = useDispatch();
	const { checking, uid } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(startChecking());
	}, [dispatch]);

	if (checking) {
		return <h1>ESPERE...</h1>;
	}

	return (
		<Router>
			<Switch>
				<PublicRoute
					exact
					path='/login'
					component={LoginScreen}
					isAuthenticated={!!uid}
				/>

				<PrivateRoute exact path='/' component={CalendarScreen} isAuthenticated={!!uid} />
				<Redirect to='/' />
			</Switch>
		</Router>
	);
};
