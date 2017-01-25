/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */
import styles from './style.css';
import {App} from './App';

/**
 * entrance code for SPA
 */

function main() {
    document.title = 'RxJS';

    const app = new App();
}

document.addEventListener('DOMContentLoaded', main);