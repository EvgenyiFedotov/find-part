import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import Page from '../../components/statefull/Page.jsx';

class Container extends Component {
  render() {
    const { children } = this.props;

    return (
      <Page title="Findpart" tools={
        <div>
          <Button
            size="small"
            onClick={this.onClick.bind(this, { hash: '#sign-in' })}
          >
            Вход
          </Button>

          <Button
            size="small"
            onClick={this.onClick.bind(this, { hash: '#sign-up' })}
          >
            Регистрация
          </Button>
        </div>
      }>
        <div>Container{children}</div>
      </Page>
    );
  }
}

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
