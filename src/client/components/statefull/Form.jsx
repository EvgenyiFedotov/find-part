import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: {},
      errors: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props;
    const { values } = this.state;

    if (prevState.values !== values
    && onChange instanceof Function) {
      onChange.call(this, values);
    }
  }

  onChange(key, ev) {
    this.setState({
      values: {
        ...this.state.values,
        [key]: ev.target.value,
      },
    });
  }

  addPropsForChild(child, index) {
    const {
      type,
      props = {},
      key,
    } = child;
    const { field, value, error } = props;
    const { values, errors } = this.state;
    let result = child;

    if (child instanceof Object
    && type instanceof Function
    && field && typeof field === 'string') {
      if (values[field] === undefined && value !== undefined) {
        values[field] = value;
      } else if (values[field] === undefined) {
        values[field] = null;
      }

      if (errors[field] === undefined && value !== undefined) {
        errors[field] = !!error;
      } else if (errors[field] === undefined) {
        errors[field] = null;
      }

      result = React.createElement(type, {
        ...props,
        key: key || index,
        value: values[field],
        error: !!errors[field],
        onChange: this.onChange.bind(this, field),
      });
    }

    return result;
  }

  renderChildren(children) {
    let result = children;

    if (children instanceof Array) {
      result = children.map(this.addPropsForChild.bind(this));
    } else {
      result = this.addPropsForChild(children);
    }

    return result;
  }

  /**
   * @param {Object} params
   */
  submit(params = {}) {
    const {
      url,
      onSubmit,
      onSubmitSuccess,
      onSubmitError,
      method,
    } = this.props;

    if (url) {
      let query = null;

      if (method === 'POST') {
        query = axios.post(url, params);
      } else if (method === 'GET') {
        query = axios.get(url, { params });
      } else {
        throw new Error('Not correct method http!');
      }

      if (query) {
        query.then(({ data, ...result }) => {
          const { success, response, errors } = data;

          if (success) {
            this.setState({ values: {} });

            if (onSubmitSuccess instanceof Function) {
              onSubmitSuccess.call(this, response, data, result);
            }
          } else {
            this.setState({
              errors: errors || {},
            });

            if (onSubmitError instanceof Function) {
              onSubmitError.call(this, errors, data, result);
            }
          }

          if (onSubmit instanceof Function) {
            onSubmit.call(this, data, result);
          }
        });
      }
    } else {
      throw new Error('Setting url in props form!');
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <div className={className}>
        {this.renderChildren(children)}
      </div>
    );
  }
}

Form.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  onChange: PropTypes.func,
  url: PropTypes.string,
  onSubmit: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  method: PropTypes.string,
};

Form.defaultProps = {
  method: 'POST',
};

export default Form;
