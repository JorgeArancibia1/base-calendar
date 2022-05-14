import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin } from '../../../redux/actions/auth';

//Creamos una función para poder ocupar el dispatch del startLogin

jest.mock('../../../redux/actions/auth', () => ({
  startLogin: jest.fn()
}))

// TRANSFORMAR LA ACCIÓN A UN MOCK COMPLETO PARA LA PRUEBA
// jest.mock('../../../redux/actions/events', () => ({
//   eventStartDelete: jest.fn()
// }))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)

store.dispatch = jest.fn() // con esto se puede saber que argumentos o que fue lo que se utilizo para llamar el dispatch

const wrapper = mount(
  <Provider store={store} >
    <LoginScreen />
  </Provider>
)

describe('Pruebas en <LoginScreen />', () => {
  test('Debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('Debe llamar el dispatch del login', () => {
    // PRIMERO HAY QUE HACER REFERENCIA A LOS DOS INPUTS DEL LOGIN
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'juan@gmail.com'
      }
    })  //Llamamos un input por el name y hacemos una simulación de "escribir en el formulario"

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: '1234567'
      }
    })

    // Hay 2 "form" y necesitamos el que encuentre primero
    wrapper.find('form').at(0).prop('onSubmit')({ // Llamamos la función mandando el argumento o el evento que tiene el preventDefault
      preventDefault() { }
    })

    expect(startLogin).toHaveBeenCalledWith('juan@gmail.com', '1234567')
  })
})