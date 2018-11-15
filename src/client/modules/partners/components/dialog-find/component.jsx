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
  Typography,
} from '@material-ui/core';
import companies from 'modules/companies';

import styles from './styles';
import Find from '../find';

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
  };

  onSelectCompany = (item) => {
    this.nextStep();
    console.log('@onSelectCompany', item);
  }

  onSelectPartner = (item) => {
    console.log('@onSelectPartner', item);
  }

  nextStep() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  prevStep() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  getContent() {
    const { activeStep } = this.state;

    switch (activeStep) {
      case 0:
        return <CompaniesList onClick={this.onSelectCompany} />;
      case 1:
        return <Find.component onSelect={this.onSelectPartner} />;
      default:
        return null;
    }
  }

  getButtons() {
    const { activeStep } = this.state;

    return (
      <div>
        <div>
          <Button
            disabled={activeStep === 0}
            size="small"
            // onClick={this.handleBack}
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="small"
            // onClick={this.handleNext}}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { open, onClose } = this.props;
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
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>
                  {label}
                </StepLabel>

                <StepContent>
                  {this.getContent()}
                  {this.getButtons()}
                </StepContent>
              </Step>
            ))}
          </Stepper>
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
};

export default withStyles(styles)(DialogFind);
