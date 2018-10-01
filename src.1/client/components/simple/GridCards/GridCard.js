import React, { Component } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styles from './styles';

export class GridCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  openMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  closeMenu() {
    this.setState({ anchorEl: null });
  }

  onRunCallback(callback, data) {
    if (callback instanceof Function) {
      callback(data);
    }

    this.closeMenu();
  }

  render() {
    const {
      classes,
      data,
      onEdit,
      onDiscounts,
    } = this.props;
    const { anchorEl } = this.state;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={data.avatar}
        />

        <CardContent>
          <Typography
            variant="title"
            component="h3"
            className={classes.cardHeader}
            gutterBottom
          >
            <div className={classes.cardName}>{data.name || ''}</div>

            <IconButton
              className={classes.buttonMenu}
              onClick={this.openMenu.bind(this)}
            >
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.closeMenu.bind(this)}
            >
              <MenuItem onClick={this.onRunCallback.bind(this, onEdit, data)}>
                Редактировать
              </MenuItem>

              <MenuItem onClick={this.onRunCallback.bind(this, onDiscounts, data)}>
                Скидки
              </MenuItem>
            </Menu>
          </Typography>

          <Typography variant="caption" component="p" className={classes.cardNote}>
            {data.note || ''}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

GridCard.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  onEdit: PropTypes.func,
  onDiscounts: PropTypes.func,
};

export default withStyles(styles)(GridCard);
