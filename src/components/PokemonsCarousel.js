import React from 'react';
import 'antd/dist/antd.css';
import './scss/PokemonsCarousel.css';
import { Carousel } from 'antd';
import { observer } from 'mobx-react';

const PokemonsCarousel = observer((props) => {
  return (
    <div className="carousel" >
      <Carousel autoplay dots={false}>
        {props.data.map((item, index) =>
          <img key={index} className="carousel__image" src={item.avatarUrl} alt="pokemon avatar" />
        )}
      </Carousel>
    </div>
  );
});

export default PokemonsCarousel;