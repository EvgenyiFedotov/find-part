import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Loadable from 'react-loadable';

import ContainerBase from '../../../components/simple/Container.jsx';
import styles from './styles';

const ButtonSessions = Loadable({
  loader: () => import(/* webpackChunkName: "ButtonSessions" */ '../../auth/components/ButtonSessions.jsx'),
  loading() {
    return (<div>Loading...</div>);
  },
  modules: ['/ButtonSessions'],
});
ButtonSessions.preload();

class Container extends Component {
  onNavigate(value) {
    axios.get('/api/auth/signout').then(({ data }) => {
      if (data.success) {
        this.container.historyPush(value);
      }
    });
  }

  render() {
    const { tools } = this.props;

    return (
      <ContainerBase
        wrappedComponentRef={(el) => { this.container = el; }}
        title="Findpart: Рабочий стол"
        tools={tools()}
        buttonsTools={[{
          children: 'Выход',
          onClick: this.onNavigate.bind(this, '/auth'),
        }]}
      >
        <Paper>
          Компании
        </Paper>
      </ContainerBase>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object,
  buttonsTools: PropTypes.func,
  tools: PropTypes.func,
};

Container.defaultProps = {
  tools() {
    return (
      <span>
        <ButtonSessions />
      </span>
    );
  },
};

export default withStyles(styles)(Container);
