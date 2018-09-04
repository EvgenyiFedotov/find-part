import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import TopView from './Top';
import styles from './styles';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <TopView />

        <Drawer
          variant="permanent"
          className={classes.drawer}
        >
          <div className={classes.drawerToolbar}>
          </div>
        </Drawer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.object,
};

export default connect()(styles(Dashboard));
