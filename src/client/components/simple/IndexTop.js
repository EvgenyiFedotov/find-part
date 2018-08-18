import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../providerStore/nav';

class IndexTop extends Component {
  sign(value) {
    this.props.dispatch(actions.setMode(`sign${value}`));
  }

  render() {
    return (
      <div className="index-top">
        <div className="logo"></div>
        <div>
          <Button
            size="small"
            color="primary"
            onClick={this.sign.bind(this, 'In')}
          >
            Вход
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={this.sign.bind(this, 'Up')}
          >
            Регистрация
          </Button>
        </div>
      </div>
    );
  }
}

IndexTop.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(IndexTop);
