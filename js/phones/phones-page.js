import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import Filter from './components/filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
	constructor({ element }) {
		this._element = element;

		this._render();

		this._initCatalog();
		this._initViewer();
		this._initFilter();
		this._initShoppingCart();

		this._showPhones();
	}

	_initCatalog() {
		this._catalog = new PhoneCatalog({
			element: document.querySelector('[data-component="phone-catalog"]'),
		});

		this._catalog.subscribe(
			'phone-selected',
			async (phoneId) => {
				const phoneDetails = await PhoneService.getById(phoneId)
					.catch(() => null);

				if (!phoneDetails) {
					return;
				}

				this._catalog.hide();
				this._viewer.show(phoneDetails);
			});

		this._catalog.subscribe(
			'added-from-catalog',
			async (phoneId) => {
				const phoneDetails = await PhoneService.getById(phoneId);

				this._cart.addItem(phoneDetails);
			});
	}

	_initViewer() {
		this._viewer = new PhoneViewer({
			element: document.querySelector('[data-component="phone-viewer"]'),
		});

		this._viewer.subscribe('back', () => {
			this._viewer.hide();
			this._showPhones();
		});

		this._viewer.subscribe(
			'added-from-viewer',
			async (phoneId) => {
				const phoneDetails = await PhoneService.getById(phoneId);

				this._cart.addItem(phoneDetails);
			});
	}

	_initShoppingCart() {
		this._cart = new ShoppingCart({
			element: document.querySelector('[data-component="shopping-cart"]'),
		});
	}

	_initFilter() {
		this._filter = new Filter({
			element: document.querySelector('[data-component="filter"]'),
		});

		this._filter.subscribe('order-changed', () => {
			this._viewer.hide();
			this._showPhones();
		});

		this._filter.subscribe('query-changed', () => {
			this._viewer.hide();
			this._showPhones();
		});
	}

	_initMessage(text) {
		this._error = document.querySelector('[data-element="phone-massage"]');

		this._error.hidden = false;
		this._error.insertAdjacentHTML(
			'afterBegin',
			`<pre class="phones-page__text">${ text }</pre>`
		);
	}

	async _showPhones() {
		const currentFiltering = this._filter.getCurrentData();
		try {
			const phones = await PhoneService.getAll(currentFiltering);
			this._catalog.show(phones);

		} catch (error) {

			this._initMessage(error + '.\nServer is not available.');
		}
	}

	_render() {
		this._element.innerHTML = `
      <div class="row">

				<!--Sidebar-->
				<div class="col-md-2" data-element="sidebar">
					<section>
						<div data-component="filter"></div>
					</section>
		
					<section>
						<div data-component="shopping-cart"></div>
					</section>
				</div>
		
				<!--Main content-->
				<div class="col-md-10 phones-page">
					<div data-component="phone-catalog"></div>
					<div data-component="phone-viewer" hidden></div> 
					<div 
						data-element="phone-massage" 
						class="phones-page__massage"
						hidden
					></div> 
		
				</div>
			</div>
    `;
	}
}
