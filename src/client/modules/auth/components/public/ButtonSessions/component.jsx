import React, { Component } from 'react';
import {
  IconButton,
  Badge,
  Popover,
} from '@material-ui/core';
import axios from 'axios';
import LaunchIcon from '@material-ui/icons/Launch';

class ButtonSessions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      open: false,
    };
  }

  componentDidMount() {
    axios.get('/api/auth/count-sessions').then(({ data }) => {
      const { success, count } = data;

      if (success) {
        this.setState({ count });
      }
    });
  }

  onClick() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { count, open } = this.state;

    if (!count) {
      return null;
    }

    return (
      <span>
        <IconButton
          aria-label="Cart"
          buttonRef={(el) => { this.button = el; }}
          onClick={this.onClick.bind(this)}
        >
          <Badge color="primary" badgeContent={count}>
            <LaunchIcon />
          </Badge>
        </IconButton>

        <Popover
          open={open}
          anchorEl={this.button}
          onClose={this.handleClose.bind(this)}
          anchorReference="anchorEl"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
        </Popover>
      </span>
    );
  }
}

export default ButtonSessions;
