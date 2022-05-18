import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../redux/types/types';
import { eventSetActive, eventStartLoading } from '../../../redux/actions/events';
import { act } from '@testing-library/react';

// TRANSFORMAR LA ACCIÓN A UN MOCK COMPLETO PARA LA PRUEBA
jest.mock('../../../redux/actions/events', () => ({
  eventStartLoading: jest.fn(),
  eventSetActive: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

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

  //Con este mismo test se pueden hacer pruebas a todos los demás elementos
  test('pruebas con interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar')

    const calendarMessages = calendar.prop('messages')
    expect(calendarMessages).toEqual(messages)

    calendar.prop('onDoubleClickEvent')()
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal })

    calendar.prop('onSelectEvent')({ start: 'Algo' })
    expect(eventSetActive).toHaveBeenCalledWith({ start: 'Algo' })

    act(() => {
      calendar.prop('onView')('week')
      expect(localStorage.setItem).toHaveBeenLastCalledWith('lastview', 'week')
    })
  })
})