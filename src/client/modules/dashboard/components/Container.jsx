import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Loadable from 'react-loadable';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ContainerBase from '../../../components/simple/Container.jsx';
import styles from './styles';

import Companies, { data as companiesData } from './Companies.jsx';

const createdStore = createStore(combineReducers({
  companies: companiesData.reducer,
}));

const ButtonSessions = Loadable({
  loader: () => import(/* webpackChunkName: "ButtonSessions" */ '../../auth/components/ButtonSessions.jsx'),
  loading() {
    return null;
  },
  modules: ['/ButtonSessions'],
});
ButtonSessions.preload();

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonSession: null,
    };
  }

  componentDidMount() {
    this.setState({
      buttonSession: <ButtonSessions />,
    });
  }

  onNavigate(value) {
    axios.get('/api/auth/signout').then(({ data }) => {
      const { success } = data;

      if (success) {
        this.container.historyPush(value);
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { buttonSession } = this.state;
    const tools = (
      <span>
        {buttonSession}
      </span>
    );
    const buttonsTools = [{
      children: 'Выход',
      onClick: this.onNavigate.bind(this, '/auth'),
    }];

    return (
      <Provider store={createdStore}>
        <ContainerBase
          wrappedComponentRef={(el) => { this.container = el; }}
          title="Findpart: Рабочий стол"
          tools={tools}
          buttonsTools={buttonsTools}
        >
          <div className={classes.content}>
            <Paper className={classes.companies}>
              <Companies />
            </Paper>
          </div>
        </ContainerBase>
      </Provider>
    );
  }
}

Container.propTypes = {
  classes: PropTypes.object,
};

Container.defaultProps = {
};

export default withStyles(styles)(Container);
