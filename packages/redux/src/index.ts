import getStores from './store';

export { IStore } from './store';

export default getStores;

export { IConfigState } from './modules/config';
import { save } from './modules/config';

export const config = {
	save
};
