import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { AppRouter } from "./routers/AppRouter";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const App = () => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};

export default App;
