import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Companies from '../../companies';
import dataExport, { actions } from '../../companies/data';

const CompaniesStore = class CompaniesStore extends Component {
  onSaveItem(params) {
    const { dispatch } = this.props;

    dispatch(actions.edit(params));
  }

  render() {
    const { dispatch, ...props } = this.props;

    return <Companies
      {...props}
      onSaveItem={this.onSaveItem.bind(this)}
    />;
  }
};

CompaniesStore.propTypes = {
  dispatch: PropTypes.func,
};

export default connect(store => ({ items: store.companies }))(CompaniesStore);
export const data = dataExport;
