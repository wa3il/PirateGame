import './css/style.css';
import map from './map.js';
import { initListeners } from './form.js';

const mymap = map();
initListeners(mymap);
