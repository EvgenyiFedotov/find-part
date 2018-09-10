import React, { Component } from 'react';
import {
  Slide,
  Dialog,
  IconButton,
  Toolbar,
  AppBar,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

export class DialogEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonSaveDisabled: true,
    };
  }

  /**
   * @param {Boolean} value
   */
  validate(value = false) {
    this.setState({ buttonSaveDisabled: !value });
  }

  onSave() {
    const { dialog } = this;
    const { onSave } = this.props;

    if (dialog && dialog.save) {
      dialog.save();
    }

    if (onSave instanceof Function) {
      onSave(dialog || null);
    }
  }

  render() {
    const {
      classes,
      content,
      data,
      open,
      onClose,
    } = this.props;

    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullScreen
      >
        <AppBar
          position="absolute"
          color="default"
        >
          <Toolbar className={classes.dialogEditToolbar}>
            <IconButton
              color="inherit"
              aria-label="Close"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>

            <Button
              color="primary"
              onClick={this.onSave.bind(this)}
              disabled={this.state.buttonSaveDisabled}
            >
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>

        <div className={classes.dialogEditContent}>
          <div className={classes.toolbar}></div>
          { content && content({
            data,
            validate: this.validate.bind(this),
            onRef: (dialog) => {
              this.dialog = dialog;
            },
          })}
        </div>
      </Dialog>
    );
  }
}

DialogEdit.propTypes = {
  classes: PropTypes.object,
  content: PropTypes.func,
  data: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default withStyles(styles)(DialogEdit);
