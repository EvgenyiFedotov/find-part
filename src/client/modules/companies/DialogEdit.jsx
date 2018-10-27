import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, TextField } from '@material-ui/core';
import { Clear, Send } from '@material-ui/icons';

import styles from './styles';

class DialogEdit extends Component {
  constructor(props) {
    super(props);

    const { index, fields } = props;

    this.state = {
      index,
      fields: {
        name: '',
        ...fields,
      },
    };
  }

  onChange(key, ev) {
    this.setState({
      fields: {
        ...this.state.fields,
        [key]: ev.target.value,
      },
    });
  }

  close() {
    const { onClose } = this.props;

    this.setState({
      fields: {
        name: '',
      },
    });

    if (onClose instanceof Function) {
      onClose.call(this);
    }
  }

  save() {
    const { onSave } = this.props;

    if (onSave instanceof Function) {
      onSave.call(this, this.state);
    }

    this.close();
  }

  render() {
    const { fields } = this.state;
    const { name } = fields;
    const { classes } = this.props;

    return (
      <div>
        <Typography className={classes.header} variant="title">
          &nbsp;

          <IconButton
            color="primary"
            className={classes.button}
            onClick={this.close.bind(this)}
          >
            <Clear />
          </IconButton>
        </Typography>

        <TextField
          label="Название"
          className={classes.dialogText}
          value={name}
          onChange={this.onChange.bind(this, 'name')}
        />

        <div className={classes.dialogFooter}>
          <IconButton
            color="primary"
            className={classes.button}
            onClick={this.save.bind(this)}
          >
            <Send />
          </IconButton>
        </div>
      </div>
    );
  }
}

DialogEdit.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  index: PropTypes.number,
  fields: PropTypes.object,
};

DialogEdit.defaultProps = {
  index: -1,
  fields: {
    name: '',
  },
};

export default withStyles(styles)(DialogEdit);
