import { authReducer } from '../../redux/reducers/authReducer';
import { types } from '../../redux/types/types';

const initState = {
  checking: true
}

describe('Pruebas en authReducer', () => {
  test('Debe retornar el estado por defecto', () => {
    const action = {}
    const state = authReducer(initState, action) // Lo que retorna del uiReducer es el estado resultante, este debe ser el estado por defecto.
    expect(state).toEqual(initState)
  })

  test('Debe autenticar el usuario', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'test'
      }
    };

    const state = authReducer(initState, action);

    expect(state).toEqual({ checking: false, uid: '123', name: 'test' });
  })
})