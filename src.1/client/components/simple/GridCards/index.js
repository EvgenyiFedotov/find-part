import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';
import GridCardView from './GridCard';
import DialogEditView from './DialogEdit';

export class GridCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      dataDialog: null,
    };
  }

  onEdit(data = null) {
    const { onAdd, onEdit } = this.props;

    this.setState({
      openDialog: true,
      data,
    });

    if (data === null && onAdd instanceof Function) {
      onAdd(null);
    } else if (data instanceof Object
      && onEdit instanceof Function) {
      onEdit(data);
    }
  }

  onCloseDialog() {
    const { onClose } = this.props;

    this.setState({ openDialog: false });

    if (onClose instanceof Function) {
      onClose();
    }
  }

  onSave(...args) {
    const { onSave } = this.props;

    if (onSave instanceof Function) {
      onSave(...args);
    }

    this.onCloseDialog();
  }

  render() {
    const {
      classes,
      items,
      dialog,
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          {
            items && items.length
              ? items.map((item, index) => (
                <GridCardView
                  key={index}
                  data={item}
                  onEdit={this.onEdit.bind(this)}
                />
              ))
              : null
          }

          <Button
            className={classes.buttonAdd}
            onClick={this.onEdit.bind(this, null)}
          >
            <AddIcon />
          </Button>

          <DialogEditView
            open={this.state.openDialog}
            data={this.state.data}
            onClose={this.onCloseDialog.bind(this)}
            onSave={this.onSave.bind(this)}
          >
            {dialog}
          </DialogEditView>
        </div>
      </div>
    );
  }
}

GridCards.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  dialog: PropTypes.func,
};

export default withStyles(styles)(GridCards);
