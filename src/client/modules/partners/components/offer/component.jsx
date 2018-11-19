import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, InputAdornment } from '@material-ui/core';
import classNames from 'classnames';

import styles from './styles';

class Component extends React.Component {
  constructor(props) {
    super();

    const { discounts, countTickets, onChange } = props;
    const defaultDiscount = discounts[0].value;

    this.state = {
      toDiscount: defaultDiscount,
      fromDiscount: defaultDiscount,
      countTickets: countTickets[0].value,
    };

    if (onChange) {
      onChange.call(this, this.state);
    }
  }

  onChange = key => (e) => {
    const { onChange } = this.props;

    this.setState({ [key]: e.target.value });

    setTimeout(() => {
      if (onChange) {
        onChange.call(this, this.state);
      }
    });
  }

  getDicountComponent = (label, key) => (
    <TextField
      select
      label={label}
      value={this.state[key]}
      onChange={this.onChange(key)}
      className={classNames(this.props.classes.discount)}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
    >
      {this.props.discounts.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        {this.getDicountComponent('Моя скидка', 'fromDiscount')}
        {this.getDicountComponent('Скидка партнера', 'toDiscount')}

        <TextField
          select
          label="Количество скидок"
          value={this.state.countTickets}
          onChange={this.onChange('countTickets')}
          className={classNames(classes.discount)}
        >
          {this.props.countTickets.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
  discounts: PropTypes.array,
  countTickets: PropTypes.array,
  onChange: PropTypes.func,
};

Component.defaultProps = {
  discounts: [
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 15,
      label: '15',
    },
  ],
  countTickets: [...Array(1000).keys()]
    .filter(value => !(value % 100))
    .map(value => ({
      value: value + 100,
      label: (value + 100).toString(),
    })),
};

export default withStyles(styles)(Component);
