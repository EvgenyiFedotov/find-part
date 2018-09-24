import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * @param {Object} mapNavigation
 * @param {Object} [oprions]
 * @param {String} [options.defValue]
 * @param {Object} [options.defParams]
 * @param {Object} [options.Container]
 * @param {React.Component} [options.Container.component]
 * @param {Object} [options.Container.props]
 */
export default function createNavigation(mapNavigation = {}, options = {}) {
  class Navigator extends Component {
    render() {
      const { value, params } = this.props;
      const { defaultValue = null, commonProps = {}, Container } = options;
      const Config = mapNavigation[value || defaultValue];
      const createView = () => <Config.component
        {...commonProps}
        {...Config.props}
        {...params}
      />;

      return (
        <div className="navigator">
          {!!Container && (
            <Container.component {...Container.props}>
              {createView()}
            </Container.component>
          )}

          {(!!Config && !Container) && createView()}
        </div>
      );
    }
  }

  return connect(store => store.navigation)(Navigator);
}
