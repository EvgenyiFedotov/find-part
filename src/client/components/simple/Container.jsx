import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

import Page from '../statefull/Page.jsx';

class Container extends Component {
  onClick(value) {
    this.historyPush(value);
  }

  historyPush(value) {
    this.props.history.push(value);
  }

  render() {
    const {
      children,
      tools,
      history,
      ...props
    } = this.props;
    let setTools = null;

    if (tools && tools.length) {
      setTools = tools.map(({ to, ...propsTool }, key) => (
        <Button
          onClick={this.onClick.bind(this, to)}
          {...propsTool}
          size="small"
          key={key}
        />
      ));
    }

    return (
      <Page
        {...props}
        tools={setTools}
      >
        {children}
      </Page>
    );
  }
}

Container.propTypes = {
  children: PropTypes.any,
  history: PropTypes.object,
  tools: PropTypes.array,
};

export default withRouter(Container);
