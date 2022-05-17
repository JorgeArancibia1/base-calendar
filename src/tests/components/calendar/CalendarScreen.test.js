import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

// TRANSFORMAR LA ACCIÓN A UN MOCK COMPLETO PARA LA PRUEBA
// jest.mock('../../../redux/actions/events', () => ({
//   eventStartDelete: jest.fn()
// }))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  calendar: {
    events: []
  },
  auth: {
    uid: '123',
    name: 'userTest'
  },
  ui: {
    openModal: false
  }
}
const store = mockStore(initState)

store.dispatch = jest.fn() // con esto se puede saber que argumentos o que fue lo que se utilizo para llamar el dispatch

const wrapper = mount(
  <Provider store={store} >
    <CalendarScreen />
  </Provider>
)


describe('Pruebas en CalendarScreen', () => {
  test('Debe mostrarse el componente correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  // test('pruebas con interacciones del calendario', () => { second })
})