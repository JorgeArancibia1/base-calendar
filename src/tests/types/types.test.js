import { types } from '../../redux/types/types';

describe('Pruebas en Types', () => {
	test('los types deben ser iguales', () => {
		expect(types).toEqual({
			uiOpenModal: '[ui] Open modal',
			uiCloseModal: '[ui] Close modal',

			eventSetActive: '[event] Set Active',
			eventLogout: '[event] Clean Logout',

			eventStartAddNew: '[event] Start add new',
			eventAddNew: '[event] Add new',
			eventClearActiveEvent: '[event] Clear active event',
			eventUpdated: '[event] event updated',
			eventDeleted: '[event] event deleted',
			eventLoaded: '[event] Show events loaded',

			authCheckingFinish: '[auth] Finish checking login state ',
			authStartLogin: '[auth] Start login',
			authLogin: '[auth] Login',
			authStartRegister: '[auth] Start Register',
			authStartTokenRenew: '[auth] Start token renew',
			authLogout: '[auth] Logout',
		});
	});
});
