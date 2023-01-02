
export const events = [
   {
      id: '1',
      start: new Date('2022-10-21 13:00:00'),
      end: new Date('2022-10-21 15:00:00'),
      title: 'Cumpleaños del Julián',
      notes: 'Notas de pruebas',
   },
   {
      id: '2',
      start: new Date('2022-11-21 13:00:00'),
      end: new Date('2022-11-21 15:00:00'),
      title: 'Cumpleaños del Margarita',
      notes: 'Notas de pruebas para Margarita',
   }
]

export const initialState = {
   isLoadingEvents: true,
   events: [],
   activeEvent: null
}

export const calendarWithEventsState = {
   isLoadingEvents: false,
   events: [...events],
   activeEvent: null
}

export const calendarWithActiveEventState = {
   isLoadingEvents: false,
   events: [...events],
   activeEvent: {...events[0]}
}