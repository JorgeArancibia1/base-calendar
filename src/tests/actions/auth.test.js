import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import Swal from 'sweetalert2';
import { startLogin } from '../../redux/actions/auth';
import { types } from '../../redux/types/types';

jest.mock('sweetalert2', () => ({
  fire:jest.fn()
}))

const middlewares = [ thunk ]
const mockStore = configureStore( middlewares )

const initState = {}
let store = mockStore( initState )

Storage.prototype.setItem = jest.fn() // Creamos la función para localStorage

describe('Pruebas en las acciones del auth', () => {

  beforeEach(() => {
    store = mockStore( initState )
      jest.clearAllMocks(); //Limpiamos todo para asegurarnos de que no se traiga info basura.
  })

  test('startLogin debe funcionar', async () => {
    await store.dispatch( startLogin('jeal@gmail.com', '1234567') )
    const actions = store.getActions()

    expect( actions[0] ).toEqual({ // actions devuelve un arreglo de 0
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    })

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String))
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    // token = localStorage.setItem.mock.calls[0][1]
    // console.log(localStorage.setItem.mock.calls[0][1]);

  })

  test('should incorrect startLogin', async() => {
    //Asegurar que efectivamente se envía vacío si el login es incorrecto
    await store.dispatch( startLogin('jeal@gmail.com', '12345678') )
    let actions = store.getActions()

    // console.log(actions);

    expect(actions).toEqual([])
    
    //Verificar que aparece el swal-alert
    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Password incorrecto','error')

    await store.dispatch( startLogin('jeal@gmail.com', '12345678') )
    actions = store.getActions()

    //Verificar si el usuario es correcto
    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Usuario o Password incorrecto', 'error')

   })

})