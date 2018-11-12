import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Button,
} from '@material-ui/core';

import styles from './styles';

import Find from '../find';

class DialogFind extends Component {
  onSelect = (item) => {
    console.log('@onSelect', item);
  }

  render() {
    const { open, onClose } = this.props;

    return (
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Поиск партнера
        </DialogTitle>

        <DialogContent>
          <Find.component onSelect={this.onSelect} />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogFind.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default withStyles(styles)(DialogFind);
