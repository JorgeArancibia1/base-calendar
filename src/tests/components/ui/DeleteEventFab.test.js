import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { EventDeleteFab } from '../../../components/ui/EventDeleteFab';
import { eventStartDelete } from '../../../redux/actions/events';

// TRANSFORMAR LA ACCIÓN A UN MOCK COMPLETO PARA LA PRUEBA
jest.mock('../../../redux/actions/events', () => ({
  eventStartDelete: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)

store.dispatch = jest.fn() // con esto se puede saber que argumentos o que fue lo que se utilizo para llamar el dispatch

const wrapper = mount(
  <Provider store={store} >
    <EventDeleteFab />
  </Provider>
)


describe('Pruebas en <EventDeleteFab />', () => {
  test('Debe mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot()
  })

  test('Debe llamar al eventStartDelete al hacer click', () => {
    wrapper.find('button').prop('onClick')() // Así se puede ejecutar la función de un botón, en este caso es el único botón

    expect(eventStartDelete).toHaveBeenCalled() // toHaveBeenCalled => Se usa para llamar funciones
  })
})