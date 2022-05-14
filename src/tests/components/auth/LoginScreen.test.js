import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import Swal from 'sweetalert2';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../redux/actions/auth';

//Creamos una función para poder ocupar el dispatch del startLogin

jest.mock('../../../redux/actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
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

  // SIEMPRE QUE SE TRABAJA CON MOCKS, SE DEBEN LIMPIAR ANTES DE CADA PRUEBA
  beforeEach(() => {
    jest.clearAllMocks()
  })

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
    // El segundo formulario es el de Login
    wrapper.find('form').at(0).prop('onSubmit')({ // Llamamos la función mandando el argumento o el evento que tiene el preventDefault
      preventDefault() { }
    })

    expect(startLogin).toHaveBeenCalledWith('juan@gmail.com', '1234567')
  })

  test('No debe haber registro si las contraseñas son diferentes', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '123456'
      }
    })

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '1234567'
      }
    })

    // El segundo formulario es el de registrarse
    wrapper.find('form').at(1).prop('onSubmit')({ // Llamamos la función mandando el argumento o el evento que tiene el preventDefault
      preventDefault() { }
    })

    expect(startRegister).not.toHaveBeenCalled();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error')
  })

  test('Registro con contraseñas iguales', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: {
        name: 'rPassword1',
        value: '1234567'
      }
    })

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: {
        name: 'rPassword2',
        value: '1234567'
      }
    })

    // El segundo formulario es el de registrarse
    wrapper.find('form').at(1).prop('onSubmit')({ // Llamamos la función mandando el argumento o el evento que tiene el preventDefault
      preventDefault() { }
    })

    expect(Swal.fire).not.toHaveBeenCalled();

    expect(startRegister).toHaveBeenCalledWith('koke4@gmail.com', '1234567', 'Koke4')
  })
})