import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class Component extends React.Component {
  render() {
    return (
      <div>
        NAME_COMPONENT
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Component);
