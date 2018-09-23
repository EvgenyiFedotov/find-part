import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * @param {Object} mapNavigation
 * @param {String} defValue
 * @param {Object} defParams
 */
export default function createNavigation(mapNavigation = {}, defValue = null, defParams = {}) {
  class Navigator extends Component {
    render() {
      const { value, params } = this.props;
      const Config = mapNavigation[value || defValue];

      return (
        <div className="navigator">
          {!!Config && (
            <Config.view {...(params || defParams)} {...Config.props} />
          )}
        </div>
      );
    }
  }

  return connect(store => store.navigation)(Navigator);
}
