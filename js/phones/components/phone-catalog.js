import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({	element }) {
  	super({ element });

  	this._phones = [];

    this._render();

    this.on('click', 'details-link', (event) => {
			let phoneElement = event.target.closest('[data-element="phone"]');

			this.emit('phone-selected', phoneElement.dataset.phoneId);
		});

		this.on('click', 'add-button', (event) => {
			let phoneElement = event.target.closest('[data-element="add-button"]');

			this.emit('added-from-catalog', phoneElement.dataset.phoneId);
		});
  }

	show(phoneDescription) {
		this._phones = phoneDescription;

		super.show();

		this._render();
	}

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
      	${ this._phones.map(phone => `
      		
      		<li
      			data-element="phone" 
      			data-phone-id="${ phone.id }"
      			class="thumbnail"
      		>
						<a 
							data-element="details-link"
							href="#!/phones/${ phone.id }" 
							class="thumb" 
						>
							<img alt="${ phone.name }" src="${ phone.imageUrl }">
						</a>
	
						<div class="phones__btn-buy-wrapper">
							<a 
								data-element="add-button"
								data-phone-id="${ phone.id }"
								class="btn btn-success"
							>
								Add
							</a>
						</div>
	
						<a 
							data-element="details-link"
							href="#!/phones/${ phone.id }" 
						>
							${ phone.name }
						</a>
						<p>${ phone.snippet }</p>
					</li>
      	
      	`).join('') }
			</ul>
    `;
  }
}