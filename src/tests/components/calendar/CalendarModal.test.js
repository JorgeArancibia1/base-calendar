import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent } from '../../../redux/actions/events';

jest.mock('../../../redux/actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola mundo',
      notes: 'Algunas cosas',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    }
  },
  auth: {
    uid: '123',
    name: 'userTest'
  },
  ui: {
    modalOpen: true
  }
}
const store = mockStore(initState)

store.dispatch = jest.fn() // con esto se puede saber que argumentos o que fue lo que se utilizo para llamar el dispatch

const wrapper = mount(
  <Provider store={store} >
    <CalendarModal />
  </Provider>
)

describe('Pruebas en <CalendarModal />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe mostrar el modal', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
  })

  test('Debe llamar la acción de actualizar y cerrar el modal', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    })

    expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent)
    expect(eventClearActiveEvent).toHaveBeenCalled()
  })

  test('Debe mostrar error si falta el titulo del agendamiento', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    })

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true)
  })

})