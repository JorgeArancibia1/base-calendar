import { uiReducer } from '../../redux/reducers/uiReducers';
import { uiCloseModal, uiOpenModal } from '../../redux/actions/ui';

const initState = {
  modalOpen: false
}

describe('Pruebas en uiReducer', () => { 
  test('should return default state', () => { 
    const state = uiReducer (initState, {}) // Lo que retorna del uiReducer es el estado resultante, este debe ser el estado por defecto.
    expect(state).toEqual(initState)
   })

   test('Debe abrir y cerrar el modal', () => {
     const modalOpen = uiOpenModal()
     const stateOpen = uiReducer( initState, modalOpen) // Le paso la acción que cambiará el estado inicial
     
     expect( stateOpen).toEqual({modalOpen: true})

     const modalClose = uiCloseModal();
     const stateClose = uiReducer( initState, modalClose) // Le paso la acción que cambiará el estado inicial

     expect( stateClose ).toEqual({modalOpen: false})

    })
 })