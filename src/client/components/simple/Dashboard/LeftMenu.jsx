import React from 'react';
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

function listItems(items) {
  const itemsIds = items && Object.keys(items);

  return itemsIds && itemsIds.length
    ? itemsIds.map((id, index) => {
      const item = items[id];

      return (
        <span key={index}>
          <ListItem
            button
            onClick={item.onClick}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>

          {item.divider && <Divider />}
        </span>
      );
    })
    : [];
}

function LeftMenu(props) {
  const {
    classes,
    open,
    onClickClose,
    items,
  } = props;

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.leftMenu, {
          [classes.leftMenuOpen]: open,
        }),
      }}
      open={open}
    >
      <div className={classes.toolbar}>
        <IconButton
          onClick={onClickClose && onClickClose.bind(this, false)}
        >
          <ChevronLeftIcon />
        </IconButton>
      </div>

      <Divider />

      <List component="nav">
        {listItems(items)}
      </List>

    </Drawer>
  );
}

LeftMenu.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClickClose: PropTypes.func,
  items: PropTypes.object,
};

export default styles(LeftMenu);
