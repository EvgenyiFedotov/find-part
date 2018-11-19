import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Main from './main';
import storeConfig from '../store-config';

class Store extends Component {
  onCreate = ({ fromCompany, toCompany, offer }) => {
    const { dispatch } = this.props;
    dispatch(storeConfig.queries.actions.create({
      fromCompanyId: fromCompany._id,
      toCompanyId: toCompany._id,
      fromCompanyName: fromCompany.name,
      toCompanyName: toCompany.name,
      toDiscount: offer.toDiscount,
      fromDiscount: offer.fromDiscount,
      countTickets: offer.countTickets,
    }));
  }

  render() {
    const { dispatch, ...props } = this.props;

    return <Main
      {...props}
      onCreate={this.onCreate}
    />;
  }
}

Store.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Store);
