import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }

  static get properties() {
    return {
      title: { type: String },
      pokemonList: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Taller Páginas Declarativas';
    this.pokemonList = [];
    this.fetchPokemonData();
  }

  async fetchPokemonData() {
    try {
      // Obtener todos los Pokémon (puedes ajustar el offset y limit si es necesario)
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=45'
      );
      const data = await response.json();

      // Obtener detalles de cada Pokémon
      const detailedData = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );

      // Filtrar los Pokémon base (sin evoluciones)
      const basePokemon = await Promise.all(
        detailedData.map(async(pokemon) => {
          const speciesResponse = await fetch(pokemon.species.url);
          const speciesData = await speciesResponse.json();
          return speciesData.evolves_from_species ? null : pokemon;
        })
      );

      // Filtrar los nulls de la lista final
      this.pokemonList = basePokemon.filter((pokemon) => pokemon !== null);
      console.log(this.pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }

      h3 {
        color: var(--primary-color, #000);
      }

      .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .pokemon-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #f9f9f9;
        border-radius: 8px;
        padding: 16px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: background 0.3s, transform 0.3s; /* Transiciones para el color y el movimiento */

      }

      .pokemon-container:hover {
        background: #e0f7fa; /* Color de fondo atractivo */
        transform: translateY(-5px); /* Movimiento hacia arriba */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra más prominente */
      }

      .pokemon-image {
        width: 100px;
        height: 100px;
      }

      .pokemon-name {
        font-family: 'Courier New', Courier, monospace;
        font-style: italic;
        margin-top: 8px;
      }

      .pokemon-type {
        font-family: 'Courier New', Courier, monospace;
        font-style: italic;
        margin-top: 8px;
      }

      .evolutions-button {
        margin-top: 12px;
      }

      bbva-button-default {
        margin-top: 20px;
      }
    `;
  }

  render() {
    return html` 
    <demo-app-template data-cells-type="template">
      <div slot="app-main-content">
      ${this._mainTpl}   
      ${this._listPokemonTpl}    
      </div>
    </demo-app-template>`;
  }

  get _mainTpl() {
    return html`
    <div>
      <h3>${this.title}</h3>
      <bbva-web-link @click=${this.gotodetails}>Detalles</bbva-web-link>
    </div>
    `;
  }

  get _listPokemonTpl() {
    return html`
    <div class="container">
      ${this.pokemonList ? this.pokemonList.map(pokemon => html`
        <div class="pokemon-container">
          <bbva-web-card-product class="pokemon-card">
            <!-- Imagen del Pokémon -->
            <img class="pokemon-image" slot="media" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <!-- Nombre del Pokémon -->
            <div class="pokemon-name" slot="title" style="font-family: 'Courier New', Courier, monospace; font-style: italic; text-transform: capitalize;"">${pokemon.name}</div>
            <!-- Tipos del Pokémon -->
            <div class="pokemon-type" slot="details" style="font-family: 'Courier New', Courier, monospace; font-style: italic; text-transform: capitalize;"">
              ${pokemon.types.map(typeInfo => html`<span>${typeInfo.type.name}</span>`)}
            </div>
          </bbva-web-card-product>
          <bbva-button-default @click=${this.goToEvolution}class="evolutions-button" text="Evoluciones"></bbva-button-default>
        </div>
      `) : ''}
    </div>
    `;
  }

  async goToEvolution(PokemonName) {
    this.evolutions = [];
    await this.getEvolutionsForPokemon(PokemonName);
    this.navigate('evolution');
  }


  goToHome() {
    this.navigate('home');
  }

  gotodetails() {
    this.navigate('details');
  }

  goToEvolution() {
    this.navigate('evolution');
  }

}

window.customElements.define(HomePage.is, HomePage);