import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
		super({ element });

		this.on('click', 'back-button', () => {
			this.emit('back');
		});

		this.on('click', 'small-image', (event) => {
			const smallImage = event.target;
			const largeImage = this._element.querySelector('[data-element="large-image"]');

			largeImage.src = smallImage.src;
		});

		this.on('click', 'add-button', () => {
			this.emit('added-from-viewer', this._phoneDetails.id);
		});
  }

  show(phoneDetails) {
  	this._phoneDetails = phoneDetails;

  	super.show();

  	this._render();
	}

  _render() {
  	const phone = this._phoneDetails;

    this._element.innerHTML = `
			<div>
				<img 
					data-element="large-image"
					src="${ phone.images[0] }"
					class="phone" 
					alt="Large image" 
				>
	
				<button data-element="back-button">
					Back
				</button>
				<button data-element="add-button">
					Add to basket
				</button>
		
		
				<h1>${ phone.name }</h1>
		
				<p>${ phone.description }</p>
		
				<ul class="phone-thumbs">
					${ phone.images.map(imageUrl => `
						<li>
							<img 
								data-element="small-image"
								src="${ imageUrl }"
								alt="Small image" 
							>
						</li>
					`).join('') }
				</ul>
				
				<ul class="specs">
          <li>
            <span>Availability and Networks</span>
            <dl>
              <dt>Availability</dt>
								${ phone.availability
									.map(item => {
										
										return '<dd>' + item + '</dd>'
										
									}).join('') }
                
            </dl>
          </li>
          <li>
            <span>Battery</span>
            <dl>
              <dt>Type</dt>
              <dd>${phone.battery.type}</dd>
              <dt>Talk Time</dt>
              <dd>${phone.battery.talkTime}</dd>
              <dt>Standby time (max)</dt>
              <dd>${phone.battery.standbyTime}</dd>
            </dl>
          </li>
          <li>
            <span>Storage and Memory</span>
            <dl>
              <dt>RAM</dt>
              <dd>${phone.storage.ram}</dd>
              <dt>Internal Storage</dt>
              <dd>${phone.storage.flash}</dd>
            </dl>
          </li>
          <li>
            <span>Connectivity</span>
            <dl>
              <dt>Network Support</dt>
              <dd>${phone.connectivity.cell}</dd>
              <dt>WiFi</dt>
              <dd>${phone.connectivity.wifi}</dd>
              <dt>Bluetooth</dt>
              <dd>${phone.connectivity.bluetooth}</dd>
              <dt>Infrared</dt>
              <dd>${(phone.connectivity.infrared) ? '✔' : '✘'}</dd>
              <dt>GPS</dt>
              <dd>${(phone.connectivity.gps) ? '✔' : '✘'}</dd>
            </dl>
          </li>
          <li>
            <span>Android</span>
            <dl>
              <dt>OS Version</dt>
              <dd>${phone.android.os}</dd>
              <dt>UI</dt>
              <dd>${phone.android.ui}</dd>
            </dl>
          </li>
          <li>
            <span>Size and Weight</span>
            <dl>
              <dt>Dimensions</dt>
              <dd>${phone.sizeAndWeight.dimensions[0]}</dd>
              <dd>${phone.sizeAndWeight.dimensions[1]}</dd>
              <dd>${phone.sizeAndWeight.dimensions[2]}</dd>
              <dt>Weight</dt>
              <dd>${phone.sizeAndWeight.weight}</dd>
            </dl>
          </li>
          <li>
            <span>Display</span>
            <dl>
              <dt>Screen size</dt>
              <dd>${phone.display.screenSize}</dd>
              <dt>Screen resolution</dt>
              <dd>${phone.display.screenResolution}</dd>
              <dt>Touch screen</dt>
              <dd>${(phone.display.touchScreen) ? '✔' : '✘'}</dd>
            </dl>
          </li>
          <li>
            <span>Hardware</span>
            <dl>
              <dt>CPU</dt>
              <dd>${phone.hardware.cpu}</dd>
              <dt>USB</dt>
              <dd>${phone.hardware.usb}</dd>
              <dt>Audio / headphone jack</dt>
              <dd>${phone.hardware.audioJack}</dd>
              <dt>FM Radio</dt>
              <dd>${(phone.hardware.fmRadio) ? '✔' : '✘'}</dd>
              <dt>Accelerometer</dt>
              <dd>${(phone.hardware.accelerometer) ? '✔' : '✘'}</dd>
            </dl>
          </li>
          <li>
            <span>Camera</span>
            <dl>
              <dt>Primary</dt>
              <dd>${phone.camera.primary}</dd>
              <dt>Features</dt>
              <dd>${phone.camera.features.join(', ').slice(0, -2)}</dd>
            </dl>
          </li>
          <li>
            <span>Additional Features</span>
            <dd>${phone.additionalFeatures}</dd>
          </li>
        </ul>
      </div>
    `;
  }
}