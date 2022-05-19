import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../redux/actions/events';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';


jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

jest.mock('../../../redux/actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn()
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

  test('Debe Crear un nuevo evento', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null
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

    // Si el titulo está vacio hay un error, por lo que se debe hacer una simulación para llenar con algo
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas'
      }
    })

    // Ahora una simulacion para enviar el formulario
    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    })

    // Si todo sale bien se debe disparar el eventStartAddNew()
    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'Hola pruebas',
      notes: ''
    })

    expect(eventClearActiveEvent).toHaveBeenCalled()
  })

  test('Debe validar las fechas', () => {

    //Se escribe algo porque el input está limpio
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola pruebas'
      }
    })

    const hoy = new Date()

    // Trabajamos con el segundo DateTimePiker que tenemos
    // La fecha de end debe ser mayor a la de inicio
    // Son 2 datepiker, el segundo que es el "end" está en la posición 0
    // Cuando hay un cambio de estado (setormValues) se debe llamar con la función act
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
    })

    wrapper.find('form').simulate('submit', {
      preventDefault() { }
    })

    // En este ultimo caso faltaba un tercer argumento "error" para que esté correcto
    expect(Swal.fire).toHaveBeenCalledWith("error", "La fecha de fin debe ser mayor a la fecha de inicio")
  });

})