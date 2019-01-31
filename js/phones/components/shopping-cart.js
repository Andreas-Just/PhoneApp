import Component from '../../component.js';

export default class ShoppingCart extends Component {
	constructor({ element }) {
		super({ element });

		this._items = [];

		this._render();
	}

	addItem(phoneId) {

		this._items.push(phoneId);
		


		this._render();
		console.log(phoneId);
	}

	_getItemHtml(item) {
		return `
      <li 
      	data-element="phone"
      	class="shopping-cart__item"
      >
      
				<div class="shopping-cart__img">
					<img alt="${ item.id }"
					src="${ item.images[0] }">
				</div>
				
				<span class="shopping-cart__name">${ item.name }</span>
				<span 
					data-element="items-count"
					class="shopping-cart__amount"
				>
					Qty: <br> ${ item.amount }
				</span>
				
				<i 
					data-phone-id=${ item.id }
					class="shopping-cart__delete"
				>
				</i>
				
			</li>
    `;
	}

	_render() {
		this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul 
      	data-element="items-list"
      	class="shopping-cart__list"
      >
      
        ${ this._items.map(item =>

					this._getItemHtml(item)
		
				).join('') }
        
      </ul>
    `;
	}
}