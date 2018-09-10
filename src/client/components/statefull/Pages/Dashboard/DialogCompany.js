import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import { companies, socket } from '../../../../data';

const styles = theme => ({
  input: {
    width: '100%',
  },
  paperAvatar: {
    width: '250px',
    height: '150px',
    backgroundSize: '100% 100%',
    backgroundColor: theme.palette.grey[100],
  },
});

export class DialogCompany extends Component {
  constructor(props) {
    super(props);

    const { data, onRef } = props;
    const {
      _id,
      avatar,
      name,
      note,
    } = data || {};

    this.state = {
      _id: _id || null,
      avatar: avatar || null,
      name: name || '',
      note: note || '',
    };

    if (props.validate) {
      props.validate(!!this.state.name);
    }

    if (onRef instanceof Function) {
      onRef(this);
    }
  }

  onChange(nameField, ev) {
    const { validate } = this.props;
    const { value } = ev.currentTarget;

    if (validate) {
      validate(!!(
        (nameField === 'name' && value)
        || this.state.name
      ));
    }

    this.setState({ [nameField]: value });
  }

  onDrop(files) {
    if (files && files.length) {
      this.setState({
        avatar: files[0].preview,
      });
    }
  }

  save() {
    const { dispatch } = this.props;
    const { _id } = this.state;

    if (!_id) {
      dispatch(socket.actions.runMethod(
        'apiCall',
        'companies/add',
        this.state,
        () => {
        },
      ));

      dispatch(companies.actions.add(this.state));
    } else {
      dispatch(companies.actions.edit(this.state));
    }
  }

  render() {
    const { classes } = this.props;
    const { avatar, name, note } = this.state;

    return (
      <div>
        <Dropzone
          className={classes.paperAvatar}
          multiple={false}
          onDrop={this.onDrop.bind(this)}
        >
          <Paper
            className={classes.paperAvatar}
            style={avatar && { backgroundImage: `url(${avatar})` }}
          ></Paper>
        </Dropzone>

        <TextField
          label="Name"
          margin="normal"
          className={classes.input}
          value={name}
          onChange={this.onChange.bind(this, 'name')}
        />

        <TextField
          label="Note"
          multiline
          rowsMax="4"
          margin="normal"
          className={classes.input}
          value={note}
          onChange={this.onChange.bind(this, 'note')}
        />
      </div>
    );
  }
}

DialogCompany.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  validate: PropTypes.func,
  onRef: PropTypes.func,
  dispatch: PropTypes.func,
};

export default connect()(withStyles(styles)(DialogCompany));
