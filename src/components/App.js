import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import './scss/App.css';
import PokemonsCarousel from './PokemonsCarousel.js';
import PokemonsTypesSelect from './PokemonsTypesSelect.js';
import PokemonsSearchBox from './PokemonsSearchBox.js';
import PokemonsPagination from './PokemonsPagination.js';
import PokemonsCardDeck from './PokemonsCardDeck.js';
import { storeContext } from '../Store.js';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import '@fortawesome/fontawesome-free/css/all.css';

const App = observer((props) => {
  const store = useContext(storeContext);

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
        <PokemonsCarousel data={store.pokemons} />
        <div className="select-searchbox">
          <PokemonsTypesSelect types={store.types} />
          <PokemonsSearchBox names={store.names} />
        </div>
        <PokemonsPagination page={store.page} total={store.pokemonsCount} indicator={store.indicator} />
        <PokemonsCardDeck data={store.pokemons} loading={store.loading} />
      </div>
      <div className="footer">
        <span className="footer__text">Connect with us</span>
        <div className="footer-icons">
          <a className="footer__facebook-link" href="https://www.facebook.com/Pokemon/" target="_blank">
            <i className="fab fa-facebook-square footer__icon"></i>
          </a>
          <a className="footer__youtube-link" href="https://www.youtube.com/user/pokemon" target="_blank">
            <i className="fab fa-youtube-square footer__icon"></i>
          </a>               <a className="footer__twitter-link" href="https://twitter.com/pokemon" target="_blank">
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
    </div>
  );
});

export default App;