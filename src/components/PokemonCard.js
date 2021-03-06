import React from 'react';
import 'antd/dist/antd.css';
import './scss/PokemonCard.css';
import { Card, Tag } from 'antd';
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const setTypeTagColor = (item) => {
  switch (item.name) {
    case 'normal':
      return 'geekblue';
    case 'fighting':
      return 'volcano';
    case 'flying':
      return 'blue';
    case 'poison':
      return 'magenta';
    case 'ground':
      return 'gold';
    case 'rock':
      return 'orange';
    case 'bug':
      return 'green';
    case 'ghost':
      return 'purple';
    case 'steel':
      return 'geekblue';
    case 'fire':
      return 'volcano';
    case 'water':
      return 'blue';
    case 'grass':
      return 'green';
    case 'electric':
      return 'gold';
    case 'psychic':
      return 'magenta';
    case 'ice':
      return 'cyan';
    case 'dragon':
      return 'red';
    case 'dark':
      return 'purple';
    case 'fairy':
      return 'magenta';
  };
};

const getTotalEVs = (stats) => {
  let total = 0;
  for (let item of stats) {
    total += item.base_stat;
  }
  return total;
};

const getAverage = (stats) => {
  return (getTotalEVs(stats) / stats.length).toFixed(2);
};

const PokemonCard = observer((props) => {

  // For Chart
  const scale = {
    base_stat: { alias: 'Effort values' },
    name: { alias: 'Stats' }
  };

  const title = {
    textStyle: {
      fontSize: '14',
      fontColor: '#000000'
    }
  };

  const label = {
    textStyle: {
      fontSize: '13',
      fontColor: '#000000'
    }
  };

  return (
    <Card className="card" title={props.name} bordered={true}>
      <img className="card__image card-div" src={props.avatar} alt="card image" />
      <span className="card__title">Types</span>
      <div className="card-div">
        {props.types.map((item, index) =>
          <Tag key={index} className="card__type" color={setTypeTagColor(item)}>{item.name}
          </Tag>
        )}
      </div>
      <span className="card__title">Abilities</span>
      <div className="card-div">
        <ul className="card__abilities">
          {props.abilities.map((item, index) =>
            <li key={index}>{item.name}</li>
          )}
        </ul>
      </div>
      <div className="card-height-weight">
        <div className="card__height">
          <span className="card__title">Height</span>
          <Tag color="magenta">{props.height}
          </Tag>
        </div>
        <div className="card__weight">
          <span className="card__title">Weight</span>
          <Tag color="purple">{props.weight}
          </Tag>
        </div>
      </div>
      <span className="card__title">Stats</span>
      <div className="card-div card__stats">
        <Chart height={200} data={props.stats} scale={scale} forceFit>
          <Tooltip showTitle={false} crosshairs={{ type: 'rect' }} />
          <Legend visible={false} />
          <Axis title={title} name="base_stat" label={label} />
          <Axis name="name" label={0} visible={false} />
          <Geom type="interval" position="name*base_stat"
            color={['name', ['#ff0000', '#ff8c00', '#ffd700', '#1e90ff', '#00fa9a', '#ff69b4']]} />
        </Chart>
      </div>
      <div className="card-total-average">
        <div className="card__total">
          <span className="card__title">Total EVs</span>
          <Tag color="magenta">{getTotalEVs(props.stats)}
          </Tag>
        </div>
        <div className="card__average">
          <span className="card__title">Average</span>
          <Tag color="purple">{getAverage(props.stats)}
          </Tag>
        </div>
      </div>
    </Card >
  );
});

export default PokemonCard;