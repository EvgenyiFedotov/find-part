import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Typography,
  Toolbar as ToolbarView,
  IconButton,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  title: {
    flexGrow: 1,
  },
});

class Toolbar extends Component {
  render() {
    const { classes, menu, tools } = this.props;

    return (
      <AppBar
        position="fixed"
        color="default"
      >
        <ToolbarView>
          {!!menu && (
            <IconButton>
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="title"
            className={classes.title}
          >
            {this.props.title}
          </Typography>

          <div>
            {tools}
          </div>
        </ToolbarView>
      </AppBar>
    );
  }
}

Toolbar.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  menu: PropTypes.bool,
  tools: PropTypes.any,
};

export default withStyles(styles)(Toolbar);
