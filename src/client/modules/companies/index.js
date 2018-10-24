import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';

import styles from './styles';
import DialogEdit from './DialogEdit.jsx';

class Companies extends Component {
  state = {
    items: [{}, {}, {}, {}],
    openDialog: false,
    editItem: null,
  };

  openDialog(item, index) {
    this.setState({
      openDialog: true,
      editItem: item
        ? {
          index,
          fields: item,
        }
        : null,
    });
  }

  closeDialog() {
    this.setState({
      openDialog: false,
    });
  }

  saveDialog(params) {
    const { index, fields } = params;
    const { items } = this.state;
    const newItems = [...items];

    if (index === -1) {
      newItems.push(fields);
    } else {
      newItems[index] = {
        ...newItems[index],
        ...fields,
      };
    }

    this.setState({
      items: newItems,
    });

    this.closeDialog();
  }

  deleteItem(index) {
    const { items } = this.state;
    const newItems = [...items];

    newItems.splice(index, 1);

    this.setState({
      items: newItems,
    });
  }

  render() {
    const { items, openDialog, editItem } = this.state;
    const { classes } = this.props;

    if (openDialog) {
      return (
        <DialogEdit
          onClose={this.closeDialog.bind(this)}
          onSave={this.saveDialog.bind(this)}
          {...editItem}
        />
      );
    }

    return (
      <div className={classes.companies}>
        <Typography
          variant="title"
          className={classes.header}
        >
          Компании

          <IconButton
            color="primary"
            className={classes.button}
            onClick={this.openDialog.bind(this, null)}
          >
            <Add />
          </IconButton>
        </Typography>

        <List dense={false}>
          {items.map((item, index) => (
            <ListItem
              key={index}
              onClick={this.openDialog.bind(this, item, index)}
              button
            >
              <ListItemText>
                {item.name || 'Нет названия'}
              </ListItemText>

              <ListItemSecondaryAction>
                <IconButton
                  className={classes.button}
                  onClick={this.deleteItem.bind(this, index)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Companies.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Companies);
