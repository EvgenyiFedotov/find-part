import React from 'react';
import PropTypes from 'prop-types';

export default function test(props) {
  return (
    <div>
      {props.value}
    </div>
  );
}

test.propTypes = {
  value: PropTypes.string,
};
