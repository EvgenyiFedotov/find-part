import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import LoadableModules from './loadable-modules';

const styles = {
  routerPage: {
    width: '100%',
    height: '100%',
  },
};

function Router({ classes, getCookies }) {
  const { session } = getCookies ? getCookies() : {};

  return (
    <div className={classes.routerPage}>
      <Route path="/auth" render={() => {
        if (session) {
          return <Redirect to="/dashboard" />;
        }

        return <LoadableModules.auth getCookies={getCookies} />;
      }}/>

      <Route exact path="/dashboard" component={Component.main} />
    </div>
  );
}

Router.propTypes = {
  classes: PropTypes.object,
  getCookies: PropTypes.func,
};

export default withStyles(styles)(Router);
