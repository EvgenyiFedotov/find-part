import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

import Page from '../../components/statefull/Page.jsx';

class Container extends Component {
  onClick(value) {
    this.props.history.push(value);
  }

  render() {
    const { children } = this.props;

    return (
      <Page title="Findpart" tools={
        <div>
          <Button
            size="small"
            onClick={this.onClick.bind(this, '/auth/signin')}
          >
            Вход
          </Button>

          <Button
            size="small"
            onClick={this.onClick.bind(this, '/auth/signup')}
          >
            Регистрация
          </Button>
        </div>
      }>
        {children}
      </Page>
    );
  }
}

Container.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object,
};

export default withRouter(Container);
