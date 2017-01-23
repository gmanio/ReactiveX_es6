/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */

import Rx from 'rxjs/Rx';

import SearchList from './list.component';

// API key for fetch data.
const AppKey = 'f0c12da8-2ef4-3e24-8815-e2f347909a80';

export default class SearchComponent {
    constructor(searchKeyword) {
        // initialized searchList Component
        this.oSearchList = new SearchList();

        // setting default keyword
        this.searchKeyword = searchKeyword ? searchKeyword : 'nike';

        this.attachEvent();
        this.search();
    }

    attachEvent() {
        Rx.Observable.fromEvent(document.querySelector('.inp'), 'input')
            .debounceTime(400)
            .distinctUntilChanged()
            .scan(function (prev, current) {
                if (prev == null) {
                    return null;
                }
                return current;
            })
            .filter((e) => {
                let text = e.target.value;

                if (text != null && text != "") {
                    // searchText null validation.
                    this.searchKeyword = text;
                    return text;
                }
            })
            .subscribe(
                // success
                () => {
                    this.search();
                },
                // fail
                (err) => {
                    console.log(err);
                }
            );
    }

    search() {
        Rx.Observable.ajax({
            url: 'http://apis.skplanetx.com/11st/v2/common/products?appKey=' + AppKey + '&searchKeyword=' + this.searchKeyword + '&sortCode=A',
            crossDomain: true,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
            .retry(3)
            .map(e => e.response)
            .map(e => {
                if (e.ProductSearchResponse) {
                    return e.ProductSearchResponse.Products.Product
                }
            })
            .subscribe(
                (res) => {
                    this.oSearchList.render(res);
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}