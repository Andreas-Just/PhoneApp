import Component from '../../component.js';

const deepEqual = _.isEqual;

export default class ShoppingCart extends Component {
	constructor({ element }) {
		super({ element });

		this._itemsMap = new Map();

		this._render();

		this.on('click', 'item-del', (event) => {
			let itemList = event.target.closest('[data-element="phone"]');
			let phoneId = itemList.dataset.phoneId;

			this._itemsMap.forEach((count, phone) => {
					this._delItem(phone, count, phoneId)
			});
		});

		this._phoneAvailability = this._pullThePhone(deepEqual, this._itemsMap);
	}

	_pullThePhone(func, map) {
			return function(args) {

				return [...map.keys()].find(item => {
					if (func.call(this, args, item) ) {
					  return item;
					}
				});
			}
		}

	addItem(phoneDetails) {
		console.log(this._phoneAvailability(phoneDetails));

		if ( this._itemsMap.size ) {

			if ( this._phoneAvailability(phoneDetails).id === phoneDetails.id ) {
				let count = this._itemsMap.get(this._phoneAvailability(phoneDetails));
				console.log(count);
				count++;
				this._itemsMap.set(this._phoneAvailability(phoneDetails), count);

			} else {
				this._itemsMap.set(phoneDetails, 1);
			}

		} else {
			this._itemsMap.set(phoneDetails, 1);
		}

		this._render();
	}

	_delItem(phone, count, phoneId) {

		if ( phone.id === phoneId && count > 1 ) {
			count--;
			this._itemsMap.set(phone, count);

		} else if ( phone.id === phoneId ) {
			this._itemsMap.delete(phone);
		}

		this._render();
	}

	_getItemHtml(phone, count) {
		return `
      <li 
      	data-phone-id=${ phone.id }
      	data-element="phone"
      	class="shopping-cart__item"
      >
      
				<div class="shopping-cart__img">
					<img alt="${ phone.id }"
					src="${ phone.images[0] }">
				</div>
				
				<span class="shopping-cart__name">${ phone.name }</span>
				<span 
					data-element="item-count"
					class="shopping-cart__amount"
				>
					Qty: <br> ${ count }
				</span>
				
				<span 
					data-phone-id=${ phone.id }
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
      <h4>Shopping Cart</h4>
      
      ${ this._itemsMap.size > 0 ? `
				<ul 
					data-element="items-list"
					class="shopping-cart__list"
				>
					${ [...this._itemsMap].map(item => {
						let phone = item[0], count = item[1];
			
						return this._getItemHtml(phone, count);
			
					}).join('') }				
				</ul>
			` : `
      	<p><i>No product has been <br/> selected yet.</i></p>
      ` }
    `;
	}
}