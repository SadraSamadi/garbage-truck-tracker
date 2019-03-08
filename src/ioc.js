import {Container} from 'inversify';
import {helpers} from 'inversify-vanillajs-helpers';

export const container = new Container({
	defaultScope: 'Singleton'
});

export const registerSelf = helpers.registerSelf(container);
