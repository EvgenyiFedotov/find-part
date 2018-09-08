import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles';
import ToolbarView from './Toolbar.jsx';
import LeftMenuView from './LeftMenu.jsx';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { shift: false };
  }

  shift(shift) {
    this.setState({ shift });
  }

  render() {
    const {
      classes,
      items,
      children,
      currentItem,
    } = this.props;
    let { title } = this.props;
    const { shift } = this.state;
    let content = children;

    if (currentItem) {
      const currItemCfg = items[currentItem];

      if (currItemCfg) {
        title = currItemCfg.title || title;
        content = currItemCfg.content || content;
      }
    }

    return (
      <div className={classes.root}>
        <ToolbarView
          shift={!!shift}
          onClickMenu={this.shift.bind(this)}
          title={title}
        />

        <LeftMenuView
          open={shift}
          onClickClose={this.shift.bind(this)}
          items={items}
        />

        <div className={classes.content}>
          <div className={classes.toolbar}></div>

          {content}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  title: PropTypes.string,
  items: PropTypes.object,
  currentItem: PropTypes.string,
};

export default styles(Dashboard);
