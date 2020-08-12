import React from 'react';
import 'antd/dist/antd.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import './scss/PokemonsCardDeck.css';
import { Row, Col } from 'antd';
import Loader from 'react-loader-spinner';
import PokemonCard from './PokemonCard.js';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const PokemonsCardDeck = observer(
  class PokemonsCardDeck extends React.Component {
    constructor(props) {
      super(props);
    };

    render() {
      return (
        <Row className="card-deck" justify="center">
          {this.props.loading ?
            <Loader className="loader"
              type="Oval"
              color="gold"
              height={80}
              width={80}
            /> :
            this.props.data.map((item, index) =>
              // <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
              <PokemonCard key={index} name={item.name.toUpperCase()} avatar={item.avatarUrl}
                types={item.types} abilities={item.abilities} height={item.height}
                weight={item.weight} stats={item.stats} />
              // </Col>
            )}
        </Row>
      );
    };
  });

export default PokemonsCardDeck;