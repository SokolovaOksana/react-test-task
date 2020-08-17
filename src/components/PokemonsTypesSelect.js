import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import './scss/PokemonsTypesSelect.css';
import { Select } from 'antd';
const { Option } = Select;
import { storeContext } from '../Store.js';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const PokemonsTypesSelect = observer((props) => {
  const store = useContext(storeContext);

  return (
    <div className="select">
      <Select
        className="select__component"
        mode="multiple"
        placeholder="Search pokemon by type"
        onChange={store.getPokemonsByTypes}>
        {props.types.map(item =>
          <Option className="select__option" key={item.name}>{item.name}</Option>)}
      </Select>
    </div >
  );
});

export default PokemonsTypesSelect;