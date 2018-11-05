import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Toolbar from './Toolbar.jsx';

const styles = theme => ({
  page: {
    display: 'flex',
  },
  content: {
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100%',
    paddingTop: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 8,
    },
  },
});

class Page extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.page}>
        <Toolbar
          title={this.props.title}
          tools={this.props.tools}
        />

        <div className={classes.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  tools: PropTypes.any,
  classes: PropTypes.object,
};

export default withStyles(styles)(Page);
