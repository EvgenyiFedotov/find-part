import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Paper } from '@material-ui/core';
import Dropzone from 'react-dropzone';

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

    const { data } = props;
    const { avatar, name, note } = data || {};

    this.state = {
      avatar: avatar || null,
      name: name || '',
      note: note || '',
    };

    if (props.validate) {
      props.validate(!!this.state.name);
    }
  }

  onChange(nameField, ev) {
    this.setState({ [nameField]: ev.currentTarget.value });
  }

  onDrop(files) {
    if (files && files.length) {
      this.setState({
        avatar: files[0].preview,
      });
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
};

export default withStyles(styles)(DialogCompany);
