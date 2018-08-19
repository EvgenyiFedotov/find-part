import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../providerStore/nav';

class IndexTop extends Component {
  sign(value) {
    this.props.dispatch(actions.setMode(value));
  }

  render() {
    return (
      <div className="index-top">
        <div
          className="logo"
          onClick={this.sign.bind(this, null)}
        >
          FINDPART
        </div>

        <div className="buttons">
          <Button
            size="small"
            color="primary"
            onClick={this.sign.bind(this, 'signIn')}
          >
            Вход
          </Button>

          <Button
            size="small"
            color="primary"
            onClick={this.sign.bind(this, 'signUp')}
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
