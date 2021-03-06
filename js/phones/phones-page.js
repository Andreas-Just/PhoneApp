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

		this._catalog.subscribe('phone-selected', (phoneId) => {

			PhoneService.getById(phoneId, (phoneDetails) => {
				this._catalog.hide();
				this._viewer.show(phoneDetails);
			});
		});

		this._catalog.subscribe('added-from-catalog', (phoneId) => {
			PhoneService.getById(phoneId, (phoneDetails) => {
				this._cart.addItem(phoneDetails);
			});
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

		this._viewer.subscribe('added-from-viewer', (phoneId) => {
			PhoneService.getById(phoneId, (phoneDetails) => {
				this._cart.addItem(phoneDetails);
			});
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
			this._showPhones();
		});

		this._filter.subscribe('query-changed', () => {
			this._showPhones();
		});
	}

	_showPhones() {
		const currentFiltering = this._filter.getCurrentData();

		PhoneService.getAll(currentFiltering, (phoneDescription) => {
			this._catalog.show(phoneDescription);
		});
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
				<div class="col-md-10">
					<div data-component="phone-catalog"></div>
					<div data-component="phone-viewer" hidden></div> 
		
				</div>
			</div>
    `;
  }
}
