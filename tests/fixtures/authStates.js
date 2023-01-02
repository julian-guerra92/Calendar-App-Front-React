
export const initialState = {
   status: 'ckecking',
   user: {},
   errorMessage: undefined
}

export const authenticatedState = {
   status: 'authenticated',
   user: {
      uid: 'abc',
      name: 'Julián'
   },
   errorMessage: undefined
}

export const notAuthenticatedState = {
   status: 'not-authenticated',
   user: {},
   errorMessage: undefined
}