import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Badge } from '@material-ui/core';
import axios from 'axios';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

class ButtonSessions extends Component {
  render() {
    return (
      <IconButton aria-label="Cart">
        <Badge badgeContent={4} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    );
  }
}

export default ButtonSessions;
