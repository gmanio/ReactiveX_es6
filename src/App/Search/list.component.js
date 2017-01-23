/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */

export default class SearchList {
    constructor(){
        this.cachedElement();
    }

    cachedElement(){
        this.listWrapper = document.querySelector('.item_list');
    }

    render(res){
        this.listWrapper.innerHTML = "";

        for (var i = 0; i < res.length; i++) {

            // Html5 <template> import
            let template = document.querySelector('#tmpl_item');
            let elImg = template.content.querySelector('img');
            elImg.src = res[i].ProductImage;

            let clone = document.importNode(template.content, true);
            this.listWrapper.appendChild(clone);
        }
    }
}