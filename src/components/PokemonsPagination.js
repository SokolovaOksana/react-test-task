import React, { useContext } from 'react';
import 'antd/dist/antd.css';
import './scss/PokemonsPagination.css';
import { Pagination } from 'antd';
import { storeContext } from '../Store.js';
import { observer } from 'mobx-react';

const PokemonsPagination = observer((props) => {
  const store = useContext(storeContext);

  return (
    <div className="pagination">
      <Pagination
        className="pagination__component"
        pageSizeOptions={['10', '20', '50']}
        showSizeChanger
        showQuickJumper
        showLessItems={true}
        current={props.page}
        onChange={store.paginationHandleChange}
        total={props.total}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} />
    </div>);
});

export default PokemonsPagination;