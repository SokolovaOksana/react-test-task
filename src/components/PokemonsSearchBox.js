import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import './scss/PokemonsSearchBox.css';
import { Input } from 'antd';
const { Search } = Input;
import { AutoComplete } from 'antd';
import { storeContext } from '../Store.js';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const PokemonsSearchBox = observer((props) => {
  const store = useContext(storeContext);

  return (
    <div className="searchbox">
      <AutoComplete
        className="searchbox__search"
        options={props.names}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      >
        <Search
          type="text"
          allowClear="true"
          placeholder="Search pokemon by name"
          onSearch={store.getPokemonByName} />
      </AutoComplete>
    </div>);
});

export default PokemonsSearchBox;