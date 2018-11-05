import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListSubheader,
  ListItem,
} from '@material-ui/core';
import axios from 'axios';
import LaunchIcon from '@material-ui/icons/Launch';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  list: {
    width: '300px',
    height: '300px',
  },
  listItemHeader: {
    backgroundColor: 'white',
  },
};

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
    const { classes } = this.props;
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
          Раздел находится в разработке
          <List className={classes.list}>
            {[0, 1, 2, 3, 4].map(sectionId => (
              <div key={`section-${sectionId}`} >
                {/* <ListSubheader className={classes.listItemHeader}>
                  {`I'm sticky ${sectionId}`}
                </ListSubheader> */}

                {[0, 1, 2].map(item => (
                  <ListItem button key={`item-${sectionId}-${item}`}>
                    {`Item ${item}`}
                  </ListItem>
                ))}
              </div>
            ))}
          </List>
        </Popover>
      </span>
    );
  }
}

ButtonSessions.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(ButtonSessions);
