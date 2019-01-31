import Component from '../../component.js';

export default class ShoppingCart extends Component {
	constructor({ element }) {
		super({ element });

		this._items = new Map();

		this._render();

		this.on('click', 'item-del', (event) => {
			let phoneElement = event.target.closest('[data-element="phone"]');
			let id = phoneElement.dataset.phoneId;

			[...this._items].map(item => {
					this._delItem(item[0], item[1], id)
			});
		});
	}

	_delItem(item, count, id) {

		if (item.id === id && count > 1) {
			count--;
			this._items.set(item, count);

		} else if (item.id === id) {
			this._items.delete(item);
		}

		this._render();
	}

	addItem(phoneId) {
		
		if (this._items.size) {

			if (this._items.has(phoneId)) {

				let count = this._items.get(phoneId);
				count++;
				this._items.set(phoneId, count);

			} else {
				this._items.set(phoneId, 1);
			}

		} else {
			this._items.set(phoneId, 1);
		}

		this._render();
	}

	_getItemHtml(item, count) {
		return `
      <li 
      	data-phone-id=${ item.id }
      	data-element="phone"
      	class="shopping-cart__item"
      >
      
				<div class="shopping-cart__img">
					<img alt="${ item.id }"
					src="${ item.images[0] }">
				</div>
				
				<span class="shopping-cart__name">${ item.name }</span>
				<span 
					data-element="item-count"
					class="shopping-cart__amount"
				>
					Qty: <br> ${ count }
				</span>
				
				<span 
					data-phone-id=${ item.id }
					data-element="item-del"
					class="shopping-cart__delete"
				>
				X
				</span>
				
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
      
        ${ [...this._items].map(item =>

					this._getItemHtml(item[0], item[1])

				).join('') }
        
      </ul>
    `;
	}
}