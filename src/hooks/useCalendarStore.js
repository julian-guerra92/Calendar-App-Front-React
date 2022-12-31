import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { covertEventsToDateEvents } from '../helpers';
import { onAddnewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';

export const useCalendarStore = () => {

   const dispatch = useDispatch();

   const { events, activeEvent } = useSelector(state => state.calendar);

   const { user } = useSelector(state => state.auth);

   const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent));
   }

   const startSavinfEvent = async (calendarEvent) => {
      try {
         if (calendarEvent.id) {
            //*Actualizando evento
            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
            dispatch(onUpdateEvent({ ...calendarEvent, user }));
            return;
         }
         //*Creando Evento
         const { data } = await calendarApi.post('/events', calendarEvent);
         console.log(data);
         dispatch(onAddnewEvent({ ...calendarEvent, id: data.saveEvent.id, user }));
      } catch (error) {
         console.log(error);
         Swal.fire('Error to Save', error.response.data.msg, 'error');
      }
   }

   const startDeletingEvent = async () => {
      try {
         await calendarApi.delete(`/events/${activeEvent.id}`)
         dispatch(onDeleteEvent());
      } catch (error) {
         console.log(error);
         Swal.fire('Error to Delete', error.response.data.msg, 'error');
      }
   }

   const startLoadingEvents = async () => {
      try {
         const { data } = await calendarApi.get('/events');
         const events = covertEventsToDateEvents(data.events);
         dispatch(onLoadEvents(events));
      } catch (error) {
         console.log('Error cargando eventos');
         console.log(error);
      }
   }

   return {
      //*Properties
      activeEvent,
      events,
      hasEventSelected: !!activeEvent,
      //*Methods
      setActiveEvent,
      startDeletingEvent,
      startLoadingEvents,
      startSavinfEvent,
   }
}
