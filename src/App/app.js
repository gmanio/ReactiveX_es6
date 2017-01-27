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
    }
}