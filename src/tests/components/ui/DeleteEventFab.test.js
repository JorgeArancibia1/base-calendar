import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { EventDeleteFab } from '../../../components/ui/EventDeleteFab';

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
})