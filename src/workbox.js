import { getEnvVariables } from './helpers';

const { VITE_MODE } = getEnvVariables();
const isProducttion = (VITE_MODE === 'prod');

if(isProducttion && 'serviceWorker' in navigator) {
   navigator.serviceWorker.register('sw.js')
}