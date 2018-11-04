import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';

import styles from '../styles';

class DialogEdit extends Component {
  constructor(props) {
    super(props);

    const { fields } = props;

    this.state = {
      ...fields,
    };
  }

  onChange(key, ev) {
    this.setState({
      [key]: ev.target.value,
    });
  }

  onChangeCheck(key) {
    this.setState({
      [key]: !this.state[key],
    });
  }

  close() {
    const { onClose } = this.props;

    if (onClose) {
      onClose.call(this);
    }
  }

  save() {
    const { onSave } = this.props;

    if (onSave) {
      onSave.call(this, this.state);
    }

    this.close();
  }

  delete() {
    const { onDelete } = this.props;

    if (onDelete) {
      onDelete.call(this, this.state);
    }

    this.close();
  }

  render() {
    const {
      _id,
      name = '',
      isPublic = false,
      partners = [],
    } = this.state;
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

        <FormGroup>
          <TextField
            label="Название"
            value={name}
            onChange={this.onChange.bind(this, 'name')}
            disabled={!!(isPublic || partners.length)}
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                onChange={this.onChangeCheck.bind(this, 'isPublic')}
                disabled={!!partners.length || !name}
              />
            }
            label="Публичная"
          />
        </FormGroup>

        <FormGroup>
        </FormGroup>

        <FormGroup row={true} className={classes.dialogFooter}>
          <Button
            color="secondary"
            onClick={this.delete.bind(this)}
            disabled={isPublic || !!partners.length || !_id}
          >
            Удалить
          </Button>

          <Button
            color="primary"
            className={classes.button}
            onClick={this.save.bind(this)}
          >
            Сохранить
          </Button>
        </FormGroup>
      </div>
    );
  }
}

DialogEdit.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  fields: PropTypes.object,
};

DialogEdit.defaultProps = {
  fields: {},
};

export default withStyles(styles)(DialogEdit);
