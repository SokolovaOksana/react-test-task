import React from 'react';
import 'antd/dist/antd.css';
import './scss/PokemonsPagination.css';
import { Pagination } from 'antd';
import { observer } from 'mobx-react';

const PokemonsPagination = observer(class PokemonsPagination extends React.Component {
  constructor(props) {
    super(props);
  };

  handleChange = (page, pageSize) => {
    this.props.handleChange(page, pageSize);
    switch (this.props.indicator) {
      case 'getPokemons':
        this.props.getPokemons(pageSize, page * pageSize - pageSize);
        break;
      case 'getPokemonsByTypes':
        this.props.getSlicedPokemonsByTypes(page, pageSize);
        break;
    };
  };

  render() {
    return (
      <div className="pagination">
        <Pagination
          className="pagination__component"
          pageSizeOptions={['10', '20', '50']}
          showSizeChanger
          showQuickJumper
          showLessItems={true}
          current={this.props.page}
          onChange={this.handleChange}
          total={this.props.total}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} />
      </div>
    );
  };
});

export default PokemonsPagination;