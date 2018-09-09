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
    const { onAdd } = this.props;

    this.setState({
      openDialog: true,
      data,
    });

    if (onAdd instanceof Function) {
      onAdd();
    }
  }

  onSave() {
    this.onCloseDialog();
  }

  onCloseDialog() {
    this.setState({ openDialog: false });
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
            content={dialog}
          />
        </div>
      </div>
    );
  }
}

GridCards.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  onAdd: PropTypes.func,
  dialog: PropTypes.func,
};

export default withStyles(styles)(GridCards);
