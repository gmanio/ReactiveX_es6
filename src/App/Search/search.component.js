/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */

import Rx from 'rxjs/Rx';

import SearchList from './list.component';

// API key for fetch data.
const AppKey = 'f0c12da8-2ef4-3e24-8815-e2f347909a80';

export default class SearchComponent {
    constructor(htOption) {
        // initialized searchList Component
        this.oSearchList = new SearchList();

        // setting default keyword
        this.searchKeyword = htOption.searchKeyword ? htOption.searchKeyword : 'javascript';

        this.insertHeader();
        this.attachEvent();
        // this.search();  // init search
    }

    insertHeader() {
        let headerWrapper = document.querySelector('.header');
        let header = document.querySelector('#tmpl_header');

        let cloneElement = document.importNode(header.content, true);
        headerWrapper.appendChild(cloneElement);
    }

    attachEvent() {
        this.subject = new Rx.Subject();

        this.source = Rx.Observable.fromEvent(document.querySelector('.inp'), 'keyup')
            .debounceTime(400)
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
            }).multicast(() => this.subject);


        this.subject.subscribe((x)=>{
            console.log('Next: ' + x);
        });

        this.source.connect();

    }

    search() {
        Rx.Observable.ajax({
            url: 'http://apis.skplanetx.com/11st/v2/common/products?appKey=' + AppKey + '&searchKeyword=' + this.searchKeyword + '&sortCode=A',
            crossDomain: true,
            headers: {"Content-type": "application/json", "Accept": "application/json"}
        })
            .retry(3)
            .map(e => e.response)
            .map(e => {
                if (e.hasOwnProperty('ProductSearchResponse')) {
                    return e.ProductSearchResponse.Products.Product;
                }
            })
            .subscribe(
                (res) => {
                    if (res.length != 0) {
                        this.oSearchList.render(res);
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}