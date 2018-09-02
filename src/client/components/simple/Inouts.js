import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  List,
  ListItem,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Done from '@material-ui/icons/Done';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';

import { socket, nav as navi } from '../../data';

const padding = {
  paddingLeft: '8px',
  paddingRight: '8px',
  color: grey[500],
};

const header = {
  padding: '8px 8px 0 8px',
  color: indigo[500],
  textAlign: 'center',
};

class Inouts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listExit: {},
    };
  }

  exitDevices(ids) {
    const { dispatch, list } = this.props;
    const { runMethod } = socket.actions;

    dispatch(runMethod(
      'apiCall',
      'inout/exitDevices',
      ids,
      () => {
        const idsExit = ids.reduce((res, val) => ({
          ...res,
          [val]: 'exit',
        }), {});

        this.setState({
          listExit: {
            ...this.state.listExit,
            ...idsExit,
          },
        });

        if (Object.keys(this.state.listExit).length === list.length) {
          this.skip();
        }
      },
    ));
  }

  exitDevice(id) {
    this.exitDevices([id]);
  }

  exitDeviceAll() {
    const { list } = this.props;

    this.exitDevices(list.map(el => el._id));
  }

  skip() {
    const { dispatch } = this.props;
    const { runMethod } = socket.actions;

    dispatch(runMethod(
      'apiCall',
      'inout/signIn',
      null,
      () => {
        dispatch(navi.actions.setRoute('dashboard'));
      },
    ));
  }

  render() {
    const { open, onClose, list } = this.props;
    const { listExit } = this.state;
    const format = 'mmmm dS\' yy HH:MM:ss';

    return (
      <div className="inouts">
        <Dialog open={open} onClose={onClose}>
          <Typography variant="title" gutterBottom style={header}>
            Не выполнен выход на других устроствах
          </Typography>

          <List>
            {
              list && list.map((item, index) => {
                const { _id } = item;

                return (
                  <ListItem
                    key={index}
                    style={{ justifyContent: 'space-between', ...padding }}
                  >
                    <div>
                      {dateformat(new Date(item.dateIn), format)}
                    </div>

                    <div>
                      {item.userAgent}
                    </div>

                    {
                      listExit[_id] === 'exit'
                        ? <IconButton color="primary"><Done /></IconButton>
                        : <IconButton
                            color="primary"
                            onClick={this.exitDevice.bind(this, _id)}
                          >
                            <ExitToApp />
                          </IconButton>
                    }

                  </ListItem>
                );
              })
            }
          </List>

          <DialogActions>
            <Button
              size="small"
              color="secondary"
              onClick={this.exitDeviceAll.bind(this)}
            >
              Выйти везде
            </Button>

            <Button
              size="small"
              color="primary"
              onClick={this.skip.bind(this)}
            >
              Далее
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Inouts.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  list: PropTypes.array,
  dispatch: PropTypes.func,
};

export default connect()(Inouts);
