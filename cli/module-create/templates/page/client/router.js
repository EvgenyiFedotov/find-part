import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';

const styles = {
  routerPage: {
    width: '100%',
    height: '100%',
  },
};

function Router({ classes }) {
  return (
    <div className={classes.routerPage}>
      <Route exact path="/NAME_MODULE" component={Component.main} />
    </div>
  );
}

Router.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Router);
