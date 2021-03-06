import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { AppRouter } from '../../routers/AppRouter';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)


// store.dispatch = jest.fn() // con esto se puede saber que argumentos o que fue lo que se utilizo para llamar el dispatch

describe('Pruevas en el <AppRouter />', () => {
  // Dentro de las pruebas se puede hacer match con el snapshoot que se muestre
  test('Debe mostrar el espere', () => {

    const initState = {
      auth: {
        checking: true
      }
    }

    const store = mockStore(initState)

    const wrapper = mount(
      <Provider store={store} >
        <AppRouter />
      </Provider>
    )
    // 2 Formas de muchas:
    // Con Snapshot
    expect(wrapper).toMatchSnapshot()
    // Sin Snapshot
    expect(wrapper.find('h1').exists()).toBe(true) // Que busque en el wrapper si existe una etiqueta h5.
  })

  test('Debe mostrar la ruta pública (Login)', () => {

    const initState = {
      auth: {
        checking: false,
        uid: null
      }
    }

    const store = mockStore(initState)

    const wrapper = mount(
      <Provider store={store} >
        <AppRouter />
      </Provider>
    )
    // Se debe hacer match con algo del componente para asegurarse de que se ejecuta correctamente, ya sea con el snap u otra cosa.
    expect(wrapper).toMatchSnapshot()
    // Sin Snapshot
    expect(wrapper.find('.login-container').exists()).toBe(true) // Que busque en el wrapper si existe una etiqueta h5.
  })

  test('Debe mostrar la ruta privada', () => {

    const initState = {
      calendar: {
        events: []
      },
      ui: {
        modalOpen: false
      },
      auth: {
        checking: false,
        uid: '123',
        name: 'Juan Carlos'
      }
    }

    const store = mockStore(initState)

    const wrapper = mount(
      <Provider store={store} >
        <AppRouter />
      </Provider>
    )
    // Se debe hacer match con algo del componente para asegurarse de que se ejecuta correctamente, ya sea con el snap u otra cosa.
    // expect(wrapper).toMatchSnapshot()
    // Sin Snapshot
    expect(wrapper.find('.calendar-screen').exists()).toBe(true) // Que busque en el wrapper si existe una etiqueta h5.
  })

  // ADEMÁS DE ESTO SE PUEDE ASEGURAR DE QUE SE DISPARE EL "STARTCHECKING" 
})