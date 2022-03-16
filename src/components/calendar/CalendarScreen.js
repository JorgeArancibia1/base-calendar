import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { useState, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import {
	eventClearActiveEvent,
	eventSetActive,
	eventStartLoading,
} from '../../redux/actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { EventDeleteFab } from '../ui/EventDeleteFab';

moment.locale('es'); // Cambiar configuración de moment en español

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { uid } = useSelector((state) => state.auth);

	const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'month');

	useEffect(() => {
		dispatch(eventStartLoading());
	}, [dispatch]);

	const onDoubleClick = () => {
		dispatch(uiOpenModal());
	};

	const onSelectEvent = (e) => {
		dispatch(eventSetActive(e));
	};

	const onSelectSlot = (e) => {
		dispatch(eventClearActiveEvent());
	};

	const onViewChange = (e) => {
		setLastView(e);
		localStorage.setItem('lastview', e);
	};

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: uid === event.user._id ? '#367CF7' : '#58ba27',
			borderRadius: '0px',
			opacity: 0.8,
			display: 'block',
			color: 'white',
		};

		return {
			style,
		};
	};

	return (
		<div className='calendar-screen'>
			<Navbar />
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor='start'
				endAccessor='end'
				messages={messages} // Configuración para cambiar algunos titulos en español
				eventPropGetter={eventStyleGetter}
				onDoubleClickEvent={onDoubleClick}
				onSelectEvent={onSelectEvent}
				onView={onViewChange} // Nos dice en que vista está: semanda, dia, mes
				onSelectSlot={onSelectSlot}
				selectable={true}
				view={lastView || 'month'}
				components={{
					event: CalendarEvent,
				}}
			/>

			<AddNewFab />

			{activeEvent && <EventDeleteFab />}

			<CalendarModal />
		</div>
	);
};
