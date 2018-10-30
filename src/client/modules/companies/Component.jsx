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
  Badge,
} from '@material-ui/core';
import { Add, Public, Group } from '@material-ui/icons';

import styles from './styles';
import DialogEdit from './components/DialogEdit';

class Companies extends Component {
  state = {
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
    const { onSaveItem } = this.props;

    if (onSaveItem) {
      onSaveItem(params);
    }
  }

  deleteItem(index) {
    const { onDeleteItem } = this.props;

    if (onDeleteItem) {
      onDeleteItem(index);
    }
  }

  render() {
    const { openDialog, editItem } = this.state;
    const { classes, items } = this.props;

    if (openDialog) {
      return (
        <DialogEdit
          onClose={this.closeDialog.bind(this)}
          onSave={this.saveDialog.bind(this)}
          onDelete={this.deleteItem.bind(this)}
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
              className={classes.listItem}
            >
              <ListItemText>
                {item.name || 'Нет названия'}
              </ListItemText>

              <ListItemSecondaryAction className={classes.actions}>
                <Public
                  color={item.isPublic ? 'action' : 'disabled'}
                  className={classes.icon}
                />

                {!!(item.partners.length) && (
                  <Badge
                    color="primary"
                    badgeContent={item.partners.length}
                    classes={{ badge: classes.badge }}
                  >
                    <Group
                      color="action"
                      className={classes.badgeIcon}
                    />
                  </Badge>
                )}

                {!(item.partners.length) && (
                  <Group
                    color="disabled"
                    className={classes.icon}
                  />
                )}
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
  items: PropTypes.array,
  onSaveItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

Companies.defaultProps = {
  items: [{}, {}, {}, {}],
};

export default withStyles(styles)(Companies);
