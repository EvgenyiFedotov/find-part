import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WorkIcon from '@material-ui/icons/Work';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from './styles';
import TopView from './Top';
import LeftMenuView from './LeftMenu';

import { socket, nav } from '../../../../data';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shift: false,
    };
  }

  shift(shift) {
    this.setState({
      shift,
    });
  }

  exit() {
    const { dispatch } = this.props;

    dispatch(socket.actions.runMethod(
      'apiCall',
      'inout/signOut',
      null,
      () => {
        dispatch(nav.actions.setRoute('auth'));
      },
    ));
  }

  render() {
    const { shift } = this.state;
    const menuButtons = [
      {
        icon: <WorkIcon />,
        text: 'Компании',
      }, {
        icon: <LoyaltyIcon />,
        text: 'Акции',
        divider: true,
      }, {
        icon: <SettingsIcon />,
        text: 'Акции',
      }, {
        icon: <ExitToAppIcon />,
        text: 'Выход',
        onClick: this.exit.bind(this),
      },
    ];

    return (
      <div>
        <TopView
          shift={!!shift}
          onClickMenu={this.shift.bind(this)}
          title={'FindPart'}
        />

        <LeftMenuView
          open={shift}
          onClickClose={this.shift.bind(this)}
          menuButtons={menuButtons}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.object,
};

export default connect()(styles(Dashboard));
