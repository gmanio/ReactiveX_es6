/**
 * Created on 2017-01-21.
 * @author: Gman Park
 */
import Rx from 'rxjs/Rx';

const AppKey = 'f0c12da8-2ef4-3e24-8815-e2f347909a80';
let searchKeyword = "nike";

export class App {
    constructor() {
        this.attachEvent();
        //Init load datas.
        this.requestData();
    }

    attachEvent() {
        let input = document.querySelector('.inp');

        Rx.Observable.fromEvent(input, 'keyup')
            .debounceTime(400)
            .map(function (e) {
                return e.target.value;
            })
            // .distinctUntilChanged()
            // .scan(function (prev, current) {
            //     if (prev == null) {
            //         return null;
            //     }
            //     return current;
            // }, null)
            // .filter(function (text) {
            //     // searchText null validation.
            //     return text != null || text != ""
            // })
            .subscribe(
                text => {
                    this.searchKeyword = text;
                    if (text != null || text != "") {
                        this.requestData();
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }

    requestData() {
        Rx.Observable
            .ajax({
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
                    let wrapper = document.querySelector('.item_list');

                    wrapper.innerHTML = "";

                    for (var i = 0; i < res.length; i++) {

                        // Html5 <template> import
                        let template = document.querySelector('#tmpl_item');
                        let elImg = template.content.querySelector('img');
                        elImg.src = res[i].ProductImage;

                        let clone = document.importNode(template.content, true);
                        wrapper.appendChild(clone);
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}