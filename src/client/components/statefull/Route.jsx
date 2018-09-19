import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pages from '../pages';

class Route extends Component {
  render() {
    const { props } = this;

    console.log(pages);

    return (
      <div className="route"></div>
    );
  }
}

Route.propTypes = {};

export default Route;
