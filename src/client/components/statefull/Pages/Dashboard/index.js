import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { menu } from './config';
import DashboardView from '../../../simple/Dashboard';

export class Dashboard extends Component {
  render() {
    const { nav } = this.props;

    return (
      <DashboardView
        items={menu(this)}
        title="FindPart"
        currentItem={nav.params.section || 'companies'}
      >
        <div>TEST CONTENT</div>
      </DashboardView>
    );
  }
}

Dashboard.propTypes = {
  nav: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(store => ({
  nav: store.nav,
}))(Dashboard);
