/**
 * Created on 2017-01-21.
 * @author: Gman Park
 */

// user modules
import SearchComponent from './Search/search.component';

export class App {
    constructor() {
        let options = {
            searchKeyword: 'javascript'
        }

        // init searchModule
        this.oSearchComponent = new SearchComponent(options);

        this.printLogo();
    }

    printLogo() {
        setTimeout(console.log.bind(console, "%cGMAN", "font:8em Arial;color:#EC6521;font-weight:bold"), 0);
        setTimeout(console.log.bind(console, "%cDevTools@2017", "font:2em sans-serif;color:#333;"), 0);
    }
}