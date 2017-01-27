/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */

export default class SearchList {
    constructor() {
        this.cachedElement();
    }

    cachedElement() {
        this.listWrapper = document.querySelector('.item_list');
        this.listTemplate = document.querySelector('#tmpl_item');

        this.listItemImage = this.listTemplate.content.querySelector('img');
        this.listItemRating = this.listTemplate.content.querySelector('.rating');
        this.listItemPrice = this.listTemplate.content.querySelector('.price');
        this.listItemProductName = this.listTemplate.content.querySelector('.name');
        this.listItemSeller = this.listTemplate.content.querySelector('.seller');
        this.listItemSellerGrade = this.listTemplate.content.querySelector('.grade');
        this.listItemLink = this.listTemplate.content.querySelector('.link');
    }

    render(res) {
        this.listWrapper.innerHTML = "";

        /**
         *  import HTML5 <template> :: data binding
         */
        for (let item of res) {
            this.listItemLink.setAttribute('href', item.DetailPageUrl);
            this.listItemImage.src = item.ProductImage300;
            this.listItemRating.innerHTML = item.BuySatisfy;
            this.listItemPrice.innerHTML = item.ProductPrice;
            this.listItemProductName.innerHTML = item.ProductName;
            this.listItemSeller.innerHTML = item.SellerNick;
            this.listItemSellerGrade.innerHTML = item.SellerGrd;

            let cloneElement = document.importNode(this.listTemplate.content, true);
            this.listWrapper.appendChild(cloneElement);
        }
    }
}