import React from 'react';
import 'antd/dist/antd.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './scss/PokemonsCardDeck.css';
import { Row } from 'antd';
import Loader from 'react-loader-spinner';
import PokemonCard from './PokemonCard.js';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const PokemonsCardDeck = observer((props) => {
  return (
    <Row className="card-deck" justify="center">
      {props.loading ?
        <Loader className="loader"
          type="Oval"
          color="gold"
          height={80}
          width={80}
        /> :
        props.data.map((item, index) =>
          <PokemonCard key={index} name={item.name.toUpperCase()} avatar={item.avatarUrl}
            types={item.types} abilities={item.abilities} height={item.height}
            weight={item.weight} stats={item.stats} />
        )}
    </Row>
  );
});

export default PokemonsCardDeck;