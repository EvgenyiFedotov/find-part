import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Container from './Container.jsx';
import styles from './styles';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

function Auth({ classes }) {
  return (
    <Container>
      <div className={classes.content}>
        <Route key={0} exact path="/" component={SignIn} />
        <Route key={1} exact path="/auth/signin" component={SignIn} />
        <Route key={2} exact path="/auth/signup" component={SignUp} />
      </div>
    </Container>
  );
}

Auth.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Auth);
