import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogActions,
  Button,
  Stepper,
  StepLabel,
  StepContent,
  Step,
} from '@material-ui/core';
import companies from 'modules/companies';

import styles from './styles';
import Find from '../find';
import Offer from '../offer';

const CompaniesList = companies.components.public.list.component;
const steps = [
  'Выберите свою компанию',
  'Настройте фильтр для поиска партнера',
  'Ваше предложение',
];

class DialogFind extends Component {
  state = {
    activeStep: 0,
    company: null,
    partner: null,
    offer: null,
  };

  onSelectCompany = (item) => {
    this.setState({ company: item });
    this.nextStep();
  }

  onSelectPartner = (item) => {
    this.setState({ partner: item });
    this.nextStep();
  }

  onChangeOffer = (offer) => {
    this.setState({ offer });
  }

  nextStep = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  prevStep = () => {
    const activeStep = this.state.activeStep - 1;

    if (activeStep === 0) {
      this.setState({ company: null, partner: null });
    } else if (activeStep === 1) {
      this.setState({ partner: null });
    } else if (activeStep === 2) {
      this.setState({ offer: null });
    }

    this.setState({ activeStep });
  }

  getContent() {
    const { activeStep } = this.state;

    switch (activeStep) {
      case 0:
        return <CompaniesList onClick={this.onSelectCompany} />;
      case 1:
        return <Find.component onSelect={this.onSelectPartner} />;
      case 2:
        return <Offer.component onChange={this.onChangeOffer} />;
      default:
        return null;
    }
  }

  getButtons() {
    const { activeStep } = this.state;

    return (
      <div>
        <Button
          disabled={activeStep === 0}
          size="small"
          color="primary"
          onClick={this.prevStep}
        >
          Назад
        </Button>
      </div>
    );
  }

  onSend = () => {
    const { onClose, onSend } = this.props;
    const { company, partner, offer } = this.state;

    if (company && partner && offer && onSend) {
      onSend.call(this, { company, partner, offer });
    }

    if (onClose) {
      onClose.call(this);
    }

    this.setState({
      activeStep: 0,
      company: null,
      partner: null,
      offer: null,
    });
  }

  render() {
    const { classes, open, onClose } = this.props;
    const { activeStep } = this.state;

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
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className={classes.stepper}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>
                  {label}
                </StepLabel>

                <StepContent>
                  <div className={classes.stepContent}>
                    {this.getContent()}
                  </div>

                  {this.getButtons()}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Отмена
          </Button>

          <Button onClick={this.onSend} color="primary">
            Отправить
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
  onSend: PropTypes.func,
};

export default withStyles(styles)(DialogFind);
