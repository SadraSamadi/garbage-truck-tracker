import {Container} from 'inversify';
import {helpers} from 'inversify-vanillajs-helpers';

export const container = new Container();

export const register = helpers.register(container);
