import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  Toolbar,
  AppBar,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import styles from './styles';

/**
 * @param {Object} [params]
 */
export class Top extends Component {
  render() {
    const {
      classes,
      shift,
      title,
      onClickMenu,
    } = this.props;

    return (
      <AppBar
        position="absolute"
        color="default"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: shift,
        })}
      >
        <Toolbar disableGutters={!shift}>
          <IconButton
            className={classNames(classes.appBarMenuButton, {
              [classes.hide]: shift,
            })}
            onClick={onClickMenu && onClickMenu.bind(this, true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="title"
            className={classes.title}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Top.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  shift: PropTypes.bool,
  title: PropTypes.string,
  onClickMenu: PropTypes.func,
};

export default connect()(styles(Top));
