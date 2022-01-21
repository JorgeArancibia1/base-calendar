import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";
import { CalendarModal } from "./CalendarModal";
import { useDispatch } from "react-redux";
import { uiOpenModal } from '../../redux/actions/ui';

moment.locale("es"); // Cambiar configuración de moment en español

const localizer = momentLocalizer(moment);

const events = [
	{
		title: "Cumpleaños del jefe",
		start: moment().toDate(),
		end: moment().add(2, "hours").toDate(),
		bgcolor: "#fafafa",
		user: {
			_id: "123",
			name: "Fernando",
		},
	},
];

export const CalendarScreen = () => {

const dispatch = useDispatch();

	const [lastView, setLastView] = useState(
		localStorage.getItem("lastview") || "month"
	);

	const onDoubleClick = (e) => {
		console.log(e);
		dispatch( uiOpenModal() );
	};

	const onSelectEvent = (e) => {
		console.log(e);
	};

	const onViewChange = (e) => {
		console.log(e);
		setLastView(e);
		localStorage.setItem("lastview", e);
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: "#367CF7",
			borderRadius: "0px",
			opacity: 0.8,
			display: "block",
			color: "white",
		};

		return {
			style,
		};
	};

	return (
		<div className="calendar-screen">
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				messages={messages} // Configuración para cambiar algunos titulos en español
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange} // Nos dice en que vista está: semanda, dia, mes
				view={lastView || "month"}
				components={{
					event: CalendarEvent,
				}}
			/>

			<CalendarModal />
		</div>
	);
};
