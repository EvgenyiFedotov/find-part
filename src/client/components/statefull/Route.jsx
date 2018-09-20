import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Route extends Component {
  render() {
    const { page, pages, stateStore } = this.props;
    const Page = pages[page];

    return (
      <div className="route">
        { !!Page && <Page stateStore={stateStore} /> }
      </div>
    );
  }
}

Route.propTypes = {
  page: PropTypes.string,
  pages: PropTypes.object,
  stateStore: PropTypes.object,
};

export default Route;
