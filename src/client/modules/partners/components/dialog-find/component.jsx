import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  DialogContent,
  DialogTitle,
  Dialog,
  Chip,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  List,
  Typography,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import {
  Search,
} from '@material-ui/icons';
import axios from 'axios';

import styles from './styles';

class DialogFind extends Component {
  state = {
    filter: '',
    chips: [],
    items: [],
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.chips !== this.state.chips) {
      axios.get('/api/partners/find', {
        params: {
          filter: this.state.chips,
        },
      }).then(({ data }) => {
        const { success, items } = data;

        if (success) {
          this.setState({ items });
        }
      });
    }
  }

  addChip = () => {
    const { filter, chips } = this.state;

    if (filter) {
      const filterExist = chips.indexOf(filter) !== -1;

      this.setState({
        chips: filterExist
          ? chips
          : [
            filter,
            ...chips,
          ],
        filter: filterExist ? filter : '',
      });
    }
  }

  deleteChip = (deleteChip) => {
    const { chips } = this.state;

    this.setState({
      chips: chips.filter(chip => chip !== deleteChip),
    });
  }

  changeFilter = ({ target }) => {
    this.setState({ filter: target.value });
  }

  keyPressFilter = ({ key }) => {
    if (key === 'Enter') {
      this.addChip();
    }
  }

  render() {
    const {
      classes,
      open,
      onClose,
      onSelect,
    } = this.props;
    const {
      filter,
      chips,
      items,
    } = this.state;

    return (
      <Dialog
        maxWidth="sm"
        fullWidth={true}
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Поиск партнера
        </DialogTitle>

        <DialogContent>
          <div className={classes.filterInputs}>
            <TextField
              type="text"
              label="Фильтр"
              value={filter}
              onChange={this.changeFilter}
              onKeyPress={this.keyPressFilter}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.addChip}
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className={classes.chips}>
            {chips.map((chip, key) => (
              <Chip
                key={key}
                className={classes.chip}
                label={chip}
                onDelete={this.deleteChip.bind(this, chip)}
              />
            ))}
          </div>

          <List dense={false}>
            {!(items.length) && (
              <Typography variant="caption">
                Список пуст
              </Typography>
            )}

            {items.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={onSelect && onSelect.bind(this, item)}
              >
                <ListItemText>
                  {item.name || 'Нет названия'}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogFind.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
};

export default withStyles(styles)(DialogFind);
