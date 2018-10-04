import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function NavigationItem({
  component,
  props = {},
  path = null,
  value = null,
  params = {},
}) {
  return path === value
    && React.createElement(component, { ...props, ...params });
}

NavigationItem.propTypes = {
  component: PropTypes.any,
  props: PropTypes.object,
  path: PropTypes.string,
  params: PropTypes.object,
};

export default connect(store => store.navigation)(NavigationItem);
