import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  List,
} from '@material-ui/core';
import {
  Add,
} from '@material-ui/icons';

import styles from './styles';
import Components from '../components';

class ComponentModule extends Component {
  state = {
    openDialog: false,
  };

  dialogOpen = () => {
    this.setState({ openDialog: true });
  }

  dialogClose = () => {
    this.setState({ openDialog: false });
  }

  dialogSelect = () => {
    console.log('@dialogSelect');
  }

  render() {
    const {
      classes,
      items,
    } = this.props;
    const {
      openDialog,
    } = this.state;

    return (
      <div>
        <Typography
          variant="title"
          className={classes.header}
        >
          Партнеры

          <IconButton
            color="primary"
            className={classes.buttonAdd}
            onClick={this.dialogOpen}
          >
            <Add />
          </IconButton>
        </Typography>

        <List dense={false}>
          {!(items.length) && (
            <Typography variant="caption">
              Список ваших парнеров пуст
            </Typography>
          )}
        </List>

        <Components.dialogFind.component
          open={openDialog}
          onClose={this.dialogClose}
          onSelect={this.dialogSelect}
        />
      </div>
    );
  }
}

ComponentModule.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
};

ComponentModule.defaultProps = {
  items: [],
};

export default withStyles(styles)(ComponentModule);
