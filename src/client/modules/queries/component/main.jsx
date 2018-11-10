import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class Component extends React.Component {
  render() {
    return <div>queries</div>;
  }
}

Component.propTypes = {
  classes: PropTypes.object,
};

Component.defaultProps = {};

export default withStyles(styles)(Component);
