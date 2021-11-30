import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { LoginScreen } from "./components/auth/LoginScreen";
import { CalendarScreen } from "./components/calendar/CalendarScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/loginScreen">
						<LoginScreen />
					</Route>
					<Route path="/">
						<CalendarScreen />
					</Route>
					<Redirect to="/" />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
