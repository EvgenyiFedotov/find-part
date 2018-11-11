import React from 'react';
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
import {
  Add,
  Public,
  Group,
  CompareArrows,
} from '@material-ui/icons';

import styles from './styles';
import Components from '../components';

class Component extends React.Component {
  state = {
    openDialog: false,
    editItem: null,
  };

  openDialog(item) {
    this.setState({
      openDialog: true,
      editItem: item || null,
    });
  }

  closeDialog() {
    this.setState({
      openDialog: false,
    });
  }

  saveDialog(item) {
    const { onSaveItem } = this.props;

    if (onSaveItem) {
      onSaveItem(item);
    }
  }

  deleteItem(item) {
    const { onDeleteItem } = this.props;

    if (onDeleteItem) {
      onDeleteItem(item);
    }
  }

  render() {
    const { openDialog, editItem } = this.state;
    const { classes, items } = this.props;
    const barge = filter => (Icon, count) => {
      if (filter()) {
        return (
          <Badge badgeContent={count}>
            <Icon />
          </Badge>
        );
      }

      return <Icon />;
    };
    const itemActions = item => (
      <ListItemSecondaryAction>
        <IconButton disabled={!item.partners}>
          {barge(() => !!item.partners)(Group, item.partners)}
        </IconButton>

        <IconButton disabled={!item.requests}>
          {barge(() => !!item.requests)(CompareArrows, item.requests)}
        </IconButton>
      </ListItemSecondaryAction>
    );

    if (openDialog) {
      return (
        <Components.dialogEdit.component
          onClose={this.closeDialog.bind(this)}
          onSave={this.saveDialog.bind(this)}
          onDelete={this.deleteItem.bind(this)}
          fields={editItem}
        />
      );
    }

    return (
      <div>
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
          {!(items.length) && (
            <Typography variant="caption">
              Список ваших компаний пуст.
            </Typography>
          )}

          {items.map((item, index) => (
            <ListItem
              key={index}
              onClick={this.openDialog.bind(this, item)}
              button
              className={classes.listItem}
            >
              <Public color={item.isPublic ? 'action' : 'disabled'} />

              <ListItemText>
                {item.name || 'Нет названия'}
              </ListItemText>

              {itemActions(item)}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  onSaveItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

Component.defaultProps = {
  items: [],
};

export default withStyles(styles)(Component);
