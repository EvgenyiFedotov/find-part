import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Toolbar as ToolbarView,
  AppBar,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import styles from './styles';

/**
 * @param {Object} [params]
 */
export function Toolbar(props) {
  const {
    classes,
    shift,
    title,
    onClickMenu,
  } = props;

  return (
    <AppBar
      position="absolute"
      color="default"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: shift,
      })}
    >
      <ToolbarView disableGutters={!shift}>
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
      </ToolbarView>
    </AppBar>
  );
}

Toolbar.propTypes = {
  classes: PropTypes.object,
  shift: PropTypes.bool,
  title: PropTypes.string,
  onClickMenu: PropTypes.func,
};

export default styles(Toolbar);
