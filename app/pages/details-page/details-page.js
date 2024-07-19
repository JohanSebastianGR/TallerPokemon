import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';
import '@cells-demo/demo-app-container/demo-app-container.js';

class DetailsPage extends CellsPage {

  static get is() {
    return 'details-page';
  }

  static get properties() {
    return {
      fullName: { type: String },
      age: { type: Number },
      city: { type: String },
      company: { type: String}
    };
  }

  constructor() {
    super();
    this.fullName = 'Johan';
    this.age = 19;
    this.city = 'Bogotá';
    this.company = 'Samtel';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        font-family: Arial, sans-serif;
        box-sizing: border-box;
      }

      h3 {
        color: #333;
        margin-bottom: 16px;
      }

      p {
        font-size: 16px;
        margin: 8px 0;
        color: #555;
      }

      bbva-button-default {
        margin-top: 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      }

      bbva-button-default:hover {
        background-color: #0056b3;
      }
    `;
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
            <h3>Details</h3>  
            <p>Nombre: ${this.fullName}</p> 
            <p>Edad: ${this.age}</p> 
            <p>Ciudad: ${this.city}</p> 
            <p>Empresa: ${this.company}</p> 
            <bbva-button-default active=""  @click=${this.gotoHome}>
                Volver
            </bbva-button-default>              
        </div>
      </demo-app-template>`;
  }

  gotoHome() {
    this.navigate('home');
  }

}
window.customElements.define(DetailsPage.is, DetailsPage);