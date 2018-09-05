import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from './styles';

export class LeftMenu extends Component {
  render() {
    const {
      classes,
      open,
      onClickClose,
      menuButtons,
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            !open && classes.leftMenu,
            open && classes.leftMenuOpen,
          ),
        }}
        open={open}
      >
        <div className={classes.leftMenuToolbar}>
          <IconButton
            onClick={onClickClose && onClickClose.bind(this, false)}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <List component="nav">
          {
            menuButtons && menuButtons.length
              ? menuButtons.map((button, index) => (
                <span key={index}>
                  <ListItem button onClick={button.onClick}>
                    <ListItemIcon>{button.icon}</ListItemIcon>
                    <ListItemText primary={button.text} />
                  </ListItem>
                  {button.divider && <Divider />}
                </span>
              ))
              : []
          }
        </List>

      </Drawer>
    );
  }
}

LeftMenu.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClickClose: PropTypes.func,
  menuButtons: PropTypes.array,
};

export default connect()(styles(LeftMenu));
