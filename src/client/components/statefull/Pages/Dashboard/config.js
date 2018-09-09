import React from 'react';
import WorkIcon from '@material-ui/icons/Work';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import GridCardsView from '../../../simple/GridCards';
import DialogCompanyView from './DialogCompany';

import { socket, nav as navi } from '../../../../data';

function setSection(dashboard, section) {
  const { dispatch, nav } = dashboard.props;

  dispatch(navi.actions.setParams({
    ...nav.params,
    section,
  }));
}

const handlersCard = {
  onEdit: (...args) => {
    console.log('onEdit', args);
  },
};

export const menu = (dashboard) => {
  const { dispatch, companies } = dashboard.props;

  return {
    companies: {
      icon: <WorkIcon />,
      text: 'Компании',
      title: 'Компании',
      content: <GridCardsView
        items={companies}
        handlersCard={handlersCard}
        dialog={ props => <DialogCompanyView {...props} />}
      />,
      onClick: setSection.bind(this, dashboard, 'companies'),
    },
    discounts: {
      icon: <LoyaltyIcon />,
      text: 'Скидки',
      title: 'Скидки',
      content: <div>Скидки</div>,
      divider: true,
      onClick: setSection.bind(this, dashboard, 'discounts'),
    },
    options: {
      icon: <SettingsIcon />,
      text: 'Настройки',
      title: 'Настройки',
      content: <div>Настройки</div>,
      onClick: setSection.bind(this, dashboard, 'options'),
    },
    exit: {
      icon: <ExitToAppIcon />,
      text: 'Выход',
      onClick: () => {
        dispatch(socket.actions.runMethod(
          'apiCall',
          'inout/signOut',
          null,
          () => {
            dispatch(navi.actions.setRoute('auth'));
          },
        ));
      },
    },
  };
};

export default {
  menu,
};
