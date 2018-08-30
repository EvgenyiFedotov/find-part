import React, { Component } from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  DialogActions,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

const padding = {
  paddingLeft: '8px',
  paddingRight: '8px',
};

class Inouts extends Component {
  render() {
    const { open, onClose, list } = this.props;
    const format = 'mmmm dS\' yy HH:MM:ss';

    return (
      <div className="inouts">
        <Dialog open={open} onClose={onClose}>
          <DialogTitle style={padding}>
            Не выполнен выход на других устроствах
          </DialogTitle>

          <List>
            {
              list && list.map((item, index) => (
                <ListItem
                  key={index}
                  style={{ justifyContent: 'space-between', ...padding }}
                >
                  {dateformat(new Date(item.dateIn), format)}

                  <Button color="primary" variant="contained" size="small">
                    Выйти
                  </Button>
                </ListItem>
              ))
            }
          </List>

          <DialogActions>
            <Button color="primary" size="small">
              Пропустить
            </Button>

            <Button color="primary" variant="contained" size="small">
              Выйти везде
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
};

export default Inouts;
