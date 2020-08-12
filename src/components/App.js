import React from 'react';
import 'antd/dist/antd.css';
import './scss/App.css';
import PokemonsCarousel from './PokemonsCarousel.js';
import PokemonsTypesSelect from './PokemonsTypesSelect.js';
import PokemonsSearchBox from './PokemonsSearchBox.js';
import PokemonsPagination from './PokemonsPagination.js';
import PokemonsCardDeck from './PokemonsCardDeck.js';
import { observer } from 'mobx-react';
import '@fortawesome/fontawesome-free/css/all.css';

const App = observer(
  class App extends React.Component {
    constructor(props) {
      super(props);
    };

    render() {
      return (
        <div className="layout">
          <div className="header">
            <div className="logo">
              <span className="logo__title">Poke&#769;dex
            <img className="logo__image logo__image_animated" align="middle" src="./logo.png" alt="logo image" />
              </span>
            </div>
          </div>
          <div className="content">
            <PokemonsCarousel data={this.props.store.pokemons} />
            <div className="select-searchbox">
              <PokemonsTypesSelect types={this.props.store.types} getPokemonsByTypes={this.props.store.getPokemonsByTypes} />
              <PokemonsSearchBox names={this.props.store.names} getPokemonByName={this.props.store.getPokemonByName} />
            </div>
            <PokemonsPagination page={this.props.store.page} handleChange={this.props.store.handleChangePage} total={this.props.store.pokemonsCount} indicator={this.props.store.indicator} getPokemons={this.props.store.getPokemons} getSlicedPokemonsByTypes={this.props.store.getSlicedPokemonsByTypes} />
            <PokemonsCardDeck data={this.props.store.pokemons} loading={this.props.store.loading} page={this.props.store.page} pageSize={this.props.store.pageSize} />
          </div>
          <div className="footer">
            <span className="footer__text">Connect with us</span>
            <div className="footer-icons">
              <a className="footer__facebook-link" href="https://www.facebook.com/Pokemon/" target="_blank">
                <i className="fab fa-facebook-square footer__icon"></i>
              </a>
              <a className="footer__youtube-link" href="https://www.youtube.com/user/pokemon" target="_blank">
                <i className="fab fa-youtube-square footer__icon"></i>
              </a>
              <a className="footer__twitter-link" href="https://twitter.com/pokemon" target="_blank">
                <i className="fab fa-twitter-square footer__icon"></i>
              </a>
              <a className="footer__instagram-link" href="https://www.instagram.com/pokemon/" target="_blank">
                <i className="fab fa-instagram footer__icon"></i>
              </a>
              <a className="footer__tumblr-link" href="https://pokemon.tumblr.com/" target="_blank">
                <i className="fab fa-tumblr-square footer__icon"></i>
              </a>
            </div>
            <span className="footer__note">An open-source site created by Sokolova with help from <a className="footer__pokeapi-link"
              href="https://pokeapi.co/"
              target="_blank">Pokéapi</a></span>
          </div>
        </div >
      );
    };
  });

export default App;