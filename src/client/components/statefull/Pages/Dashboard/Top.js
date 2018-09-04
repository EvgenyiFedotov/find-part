import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from './styles';
import { socket, nav } from '../../../../data';

/**
 * @param {Object} [params]
 */
export class Top extends Component {
  exit() {
    const { dispatch } = this.props;

    dispatch(socket.actions.runMethod(
      'apiCall',
      'inout/signOut',
      null,
      () => {
        dispatch(nav.actions.setRoute('auth'));
      },
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
          <Typography
            variant="title"
            color="primary"
            className={classes.title}
          >
            Title
          </Typography>

          <div>
            <Button
              size="small"
              color="primary"
              onClick={this.exit.bind(this)}
            >
              Выход
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Top.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.object,
};

export default connect()(styles(Top));
