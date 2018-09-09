import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
});

export function Companies(props = {}) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Button size="small">
        Добавить
      </Button>
    </Paper>
  );
}

Companies.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Companies);
