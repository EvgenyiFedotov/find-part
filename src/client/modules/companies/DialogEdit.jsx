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
import { Clear, Send } from '@material-ui/icons';

import styles from './styles';
import { defaultCompanies } from './data';

class DialogEdit extends Component {
  constructor(props) {
    super(props);

    const { index, fields } = props;

    this.state = {
      index,
      fields: {
        ...defaultCompanies,
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

  onChangeCheck(key) {
    const { fields } = this.state;

    this.setState({
      fields: {
        ...fields,
        [key]: !fields[key],
      },
    });
  }

  close() {
    const { onClose } = this.props;

    this.setState({
      fields: {
        ...defaultCompanies,
      },
    });

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
      onDelete.call(this, this.state.index);
    }

    this.close();
  }

  render() {
    const { index, fields } = this.state;
    const { name, isPublic, partners } = fields;
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
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={isPublic}
                onChange={this.onChangeCheck.bind(this, 'isPublic')}
                disabled={!!partners.length}
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
            disabled={index === -1 || !!partners.length}
          >
            Удалить
          </Button>

          <IconButton
            color="primary"
            className={classes.button}
            onClick={this.save.bind(this)}
          >
            <Send />
          </IconButton>
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
  index: PropTypes.number,
  fields: PropTypes.object,
};

DialogEdit.defaultProps = {
  index: -1,
  fields: {
    ...defaultCompanies,
  },
};

export default withStyles(styles)(DialogEdit);
