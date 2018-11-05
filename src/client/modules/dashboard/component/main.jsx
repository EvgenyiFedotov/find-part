import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import ContainerBase from 'components/simple/Container';
import Companies from 'modules/companies';
import Partners from 'modules/partners';

import ButtonSessions from './buttonSession';
import styles from './styles';
import store from './store';

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
      <Provider store={store}>
        <ContainerBase
          wrappedComponentRef={(el) => { this.container = el; }}
          title="Findpart: Рабочий стол"
          tools={tools}
          buttonsTools={buttonsTools}
        >
          <div className={classes.content}>
            <Paper className={classes.companies}>
              <Companies.Component.store />
            </Paper>

            <Paper className={classes.partners}>
              <Partners.component.main />
            </Paper>

            <Paper className={classes.requsest}>
              <Companies.Component.store />
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
