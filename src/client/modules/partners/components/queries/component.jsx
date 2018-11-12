import React from 'react';
import PropTypes from 'process';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class Component extends React.Component {
  render() {
    return (
      <div>
        queries
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Component);
