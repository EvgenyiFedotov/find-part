import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { Paper } from '@material-ui/core';
import axios from 'axios';

import ContainerBase from 'components/simple/Container';
import Companies from 'modules/companies';
import Partners from 'modules/partners';
import Queries from 'modules/queries';
import ButtonSessions from 'modules/auth/components/public/ButtonSessions/loader';

import styles from './styles';
import store from './store';

class Component extends React.Component {
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

    return (
      <Provider store={store}>
        <ContainerBase
          wrappedComponentRef={(el) => { this.container = el; }}
          title="Findpart: Рабочий стол"
          tools={<span><ButtonSessions /></span>}
          buttonsTools={[{
            children: 'Выход',
            onClick: this.onNavigate.bind(this, '/auth'),
          }]}
        >
          <div className={classes.content}>
            <Paper className={classes.companies}>
              <Companies.Component.store />
            </Paper>

            <Paper className={classes.partners}>
              <Partners.component.main />
            </Paper>

            <Paper className={classes.requsest}>
              <Queries.component.main />
            </Paper>
          </div>
        </ContainerBase>
      </Provider>
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
};

Component.defaultProps = {};

export default withStyles(styles)(Component);
