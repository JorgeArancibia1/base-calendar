import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
} from "react-router-dom";
import { LoginScreen } from "./components/auth/LoginScreen";
import { CalendarScreen } from "./components/calendar/CalendarScreen";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	return (
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
	);
};

export default App;
