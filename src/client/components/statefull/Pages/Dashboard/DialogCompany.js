import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';

export class DialogCompany extends Component {
  constructor(props) {
    super(props);

    if (props.data) {
      props.validate(true);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div></div>
    );
  }
}

DialogCompany.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  validate: PropTypes.func,
};

export default DialogCompany;
