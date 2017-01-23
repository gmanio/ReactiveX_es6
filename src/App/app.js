/**
 * Created on 2017-01-21.
 * @author: Gman Park
 */

// user modules
import SearchComponent from './Search/search.component';

export class App {
    constructor() {
        // init searchModule
        this.oSearchComponent = new SearchComponent({
            searchKeyword: 'nike'
        });
    }
}