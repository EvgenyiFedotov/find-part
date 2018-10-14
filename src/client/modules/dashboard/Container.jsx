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
      <Page title="Findpart: Рабочий стол" tools={
        <div>
          <Button
            size="small"
          >
            Выход
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
