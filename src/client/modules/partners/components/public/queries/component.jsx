import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  CircularProgress,
} from '@material-ui/core';
import { Add, ArrowForwardRounded } from '@material-ui/icons';

import styles from './styles';

class Component extends React.Component {
  render() {
    const { classes, items } = this.props;

    return (
      <div>
        <Typography
          variant="title"
          className={classes.header}
        >
          Заявки

          <IconButton
            color="primary"
            className={classes.buttonAdd}
          >
            <Add />
          </IconButton>
        </Typography>

        <List dense={false}>
          {!!items.length && items.map((item, index) => (
            <ListItem
              key={index}
              button
              className={classes.listItem}
            >
              <ArrowForwardRounded />

              {!item._id && (
                <CircularProgress size={24} className={classes.progress} />
              )}

              {!!item._id && (
                <ListItemText>
                  {item.fromCompanyName}
                </ListItemText>
              )}

              {!!item._id && (
                <ListItemText>
                  {item.toCompanyName}
                </ListItemText>
              )}

              {!!item._id && (
                <ListItemText>
                  {item.toCompanyName}
                </ListItemText>
              )}
            </ListItem>
          ))}

          {!items.length && (
            <Typography variant="caption">
              Список заявок пуст
            </Typography>
          )}
        </List>
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
};

Component.defaultProps = {
  items: [],
};

const ComponentStyles = withStyles(styles)(Component);

export default connect(store => ({
  items: store.queries,
}))(ComponentStyles);
