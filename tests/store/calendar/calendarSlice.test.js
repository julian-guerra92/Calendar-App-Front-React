import {
   calendarSlice,
   onAddnewEvent,
   onDeleteEvent,
   onLoadEvents,
   onLogoutCalendar,
   onSetActiveEvent,
   onUpdateEvent
} from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';

describe('Pruebas en calendarSlice', () => {

   test('Debe de regresar el estado por defecto', () => {
      const state = calendarSlice.getInitialState();
      expect(state).toEqual(initialState);
   })

   test('onSetActiveEvent debe de activar el evento', () => {
      const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
      expect(state.activeEvent).toEqual(events[0]);
   })

   test('onAddnewEvent debe de agregar el evento', () => {
      const newEvent = {
         id: '3',
         start: new Date('2022-09-21 13:00:00'),
         end: new Date('2022-09-21 15:00:00'),
         title: 'Cumpleaños del Jhon',
         notes: 'Notas de pruebas',
      }
      const state = calendarSlice.reducer(calendarWithEventsState, onAddnewEvent(newEvent));
      expect(state.events).toEqual([...events, newEvent]);
   })

   test('onUpdateEvent debe de actualizar el evento', () => {
      const updatedEvent = {
         id: '1',
         start: new Date('2022-10-25 13:00:00'),
         end: new Date('2022-10-25 15:00:00'),
         title: 'Cumpleaños del Julián actualizado!!',
         notes: 'Notas de pruebas actualizada!!',
      }
      const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
      expect(state.events).toContain(updatedEvent);
   })

   test('onDeleteEvent debe de eliminar el evento activo', () => {
      const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
      expect(state.events).toEqual([events[1]]);
      expect(state.activeEvent).toBe(null);
   })

   test('onLoadEvents debe de establecer los eventos', () => {
      const state = calendarSlice.reducer(initialState, onLoadEvents([...events]));
      expect(state.isLoadingEvents).toBeFalsy();
      expect(state).toEqual(calendarWithEventsState);
      const newState = calendarSlice.reducer(initialState, onLoadEvents([...events]));
      expect(state.events.length).toBe(2);
   })

   test('onLogoutCalendar debe de limpiar el estado', () => {
      const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
      expect(state).toEqual(initialState);
   })

})