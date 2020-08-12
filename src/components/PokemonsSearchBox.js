import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
const { Search } = Input;
import { AutoComplete } from 'antd';
import './scss/PokemonsSearchBox.css';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const PokemonsSearchBox = observer(
  class PokemonsSearchBox extends React.Component {
    constructor(props) {
      super(props);
    };

    handleSearch = (value) => {
      this.props.getPokemonByName(value.toLowerCase());
    };

    render() {
      return (
        <div className="searchbox">

          <AutoComplete
            className="searchbox__search"
            options={this.props.names}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          >
            <Search
              type="text"
              allowClear="true"
              placeholder="Search pokemon by name"
              onSearch={this.handleSearch} />
          </AutoComplete>

          {/* <AutoComplete
            className="searchbox__search"
            options={this.props.names}
            allowClear="true"
            placeholder="Search pokemon by name"
            onSearch={this.handleSearch}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          /> */}

          {/* <Search
            className="searchbox__search"
            type="text"
            allowClear="true"
            placeholder="Search pokemon by name"
            onSearch={this.handleSearch}
          /> */}
          {/* list="hints" */}
          {/* <datalist id="hints">
            {this.props.names.map((item, index) =>
              <option key={index}>{item}</option>
            )}
          </datalist> */}
        </div>
      );
    };
  });

export default PokemonsSearchBox;