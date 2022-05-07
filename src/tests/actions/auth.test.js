import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import Swal from 'sweetalert2';
import { startLogin, startRegister, startChecking } from '../../redux/actions/auth';
import { types } from '../../redux/types/types';
import * as fetchModule from "../../helpers/fetch";

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn() // Creamos la función para localStorage

let token  = ''

describe('Pruebas en las acciones del auth', () => {

  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks(); //Limpiamos todo para asegurarnos de que no se traiga info basura.
  })

  test('startLogin debe funcionar', async () => {
    await store.dispatch(startLogin('jeal@gmail.com', '1234567'))
    const actions = store.getActions()

    expect(actions[0]).toEqual({ // actions devuelve un arreglo de 0
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    // token = localStorage.setItem.mock.calls[0][1]
    // console.log(localStorage.setItem.mock.calls[0][1]);

  })

  test('should incorrect startLogin', async () => {
    //Asegurar que efectivamente se envía vacío si el login es incorrecto
    await store.dispatch(startLogin('jeal@gmail.com', '12345678'))
    let actions = store.getActions()

    // console.log(actions);

    expect(actions).toEqual([])

    //Verificar que aparece el swal-alert
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Usuario o Password incorrecto', 'error')

    await store.dispatch(startLogin('jeal@gmail.com', '12345678'))
    actions = store.getActions()

    //Verificar si el usuario es correcto
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Usuario o Password incorrecto', 'error')

  })

  test('startRegister debe funcionar correctamente', async () => {
    // Se podría implementar un método para borrar un usuario o hacer un mock completo para el fetchSinToken
    fetchModule.fetchSinToken = jest.fn(() => ({ // Si queremos que regrese un objeto json se hace desde el parametro de fn()))
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'test',
          token: 'ABC123ABC123'
        }
      }
    }))
    await store.dispatch(startRegister('test24@gmail.com', '123456', 'test'))

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'test'
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123ABC123')
    expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

  })

  // test('startRegister no debería funcionar', async () => { second })

  test('should StartChecking Funciona', async() => {

    fetchModule.fetchConToken = jest.fn(() => ({ // Si queremos que regrese un objeto json se hace desde el parametro de fn()))
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'test',
          token: 'ABC123ABC123'
        }
      }
    }))

    await store.dispatch( startChecking() )

    const actions = store.getActions()

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'test'
      }
    })

    expect ( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ABC123')

    // test('should startLogout', () => { second })

   })

})