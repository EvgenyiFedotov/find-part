import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Typography,
  Toolbar as ToolbarView,
  IconButton,
  Button,
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
    const { classes, menu, buttons } = this.props;

    return (
      <AppBar
        position="absolute"
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
            {!!(buttons && buttons.length) && (
              buttons.map((button, index) => (
                <Button
                  key={index}
                  size="small"
                  {...button}
                >
                  {button.value}
                </Button>
              ))
            )}
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
  buttons: PropTypes.array,
};

export default withStyles(styles)(Toolbar);
