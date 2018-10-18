import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Container from '../../../components/simple/Container.jsx';
import styles from './styles';

function ContainerSetup({
  children,
  tools,
  buttonsTools,
  classes = {},
}) {
  return (
    <Container
      title="Findpart"
      tools={tools}
      buttonsTools={buttonsTools}
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
  buttonsTools: PropTypes.array,
  tools: PropTypes.any,
};

ContainerSetup.defaultProps = {
  buttonsTools: [{
    children: 'Вход',
    to: '/auth/signin',
  }, {
    children: 'Регистрация',
    to: '/auth/signup',
  }],
};

export default withStyles(styles)(ContainerSetup);
