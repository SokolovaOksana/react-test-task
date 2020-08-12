import React, { Children } from 'react';
import 'antd/dist/antd.css';
import './scss/PokemonsTypesSelect.css';
import { Select } from 'antd';
const { Option } = Select;
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const PokemonsTypesSelect = observer(
  class PokemonsTypesSelect extends React.Component {
    constructor(props) {
      super(props);
    };
    handleChange = (types) => {
      this.props.getPokemonsByTypes(types);
    };

    render() {
      return (
        <div className="select">
          <Select
            className="select__component"
            mode="multiple"
            placeholder="Search pokemon by type"
            onChange={this.handleChange}>
            {this.props.types.map(item =>
              <Option className="select__option" key={item.name}>{item.name}</Option>)}
          </Select>
        </div >
      );
    };
  });

export default PokemonsTypesSelect;