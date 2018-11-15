import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { ListItem, ListItemText } from '@material-ui/core';

import styles from './styles';

class Component extends React.Component {
  render() {
    const { items, onClick } = this.props;

    return (
      <div>
        {items.filter(item => item.isPublic).map((item, index) => (
          <ListItem
            key={index}
            button
            onClick={onClick && onClick.bind(this, item)}
          >
            <ListItemText>
              {item.name || 'Нет названия'}
            </ListItemText>
          </ListItem>
        ))}
      </div>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
  items: PropTypes.array,
  onClick: PropTypes.func,
};

Component.defaultValues = {
  items: [],
};

const ComponentStyle = withStyles(styles)(Component);

// export default ComponentStyle;

export default connect(store => ({ items: store.companies }))(ComponentStyle);
