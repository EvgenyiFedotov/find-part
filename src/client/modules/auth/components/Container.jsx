import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Container from '../../../components/simple/Container.jsx';
import styles from './styles';

function ContainerSetup({ children, tools, classes = {} }) {
  return (
    <Container
      title="Findpart"
      tools={tools}
    >
      <div className={classes.content}>
        {children}
      </div>
    </Container>
  );
}

ContainerSetup.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
  tools: PropTypes.array,
};

ContainerSetup.defaultProps = {
  tools: [{
    children: 'Вход',
    to: '/auth/signin',
  }, {
    children: 'Регистрация',
    to: '/auth/signup',
  }],
};

export default withStyles(styles)(ContainerSetup);
