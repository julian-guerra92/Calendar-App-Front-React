import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { CalendarEvent, NavBar, CalendarModal, FabAddNew, FabbDelete } from '../';
import { localizer, getMessagesES } from '../../helpers';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

   const { user } = useAuthStore();

   const [lenguage, setLenguage] = useState(false);

   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

   const { openDateModal } = useUiStore();

   const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

   const onChangeLenguage = () => {
      setLenguage(current => !current);
   }

   const eventStyleGetter = (event, start, end, isSelected) => {
      const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);
      const style = {
         backgroundColor: isMyEvent? '#347CF7' : '#465660',
         borderRadius: '0px',
         opacity: 0.8,
         color: 'white'
      }
      return {
         style
      }
   }

   const onDoubleClick = (event) => {
      openDateModal();
   }

   const onSelect = (event) => {
      setActiveEvent(event);
   }

   const onViewChanged = (event) => {
      localStorage.setItem('lastView', event);
      setLastView(event);
   }

   useEffect(() => {
      startLoadingEvents();
   }, []);

   return (
      <>
         <NavBar onChangeLenguage={onChangeLenguage} />
         <Calendar
            culture={lenguage && 'es'}
            messages={lenguage && getMessagesES()}
            localizer={localizer}
            events={events}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 80px)' }}
            eventPropGetter={eventStyleGetter}
            components={{
               event: CalendarEvent
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onView={onViewChanged}
         />
         <CalendarModal />
         <FabAddNew />
         <FabbDelete />
      </>
   )
}
