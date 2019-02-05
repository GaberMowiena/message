import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

export default class FormTextInput extends PureComponent {
  // static propTypes = {
  // 	isError: PropTypes.bool,
  // 	isValid: PropTypes.bool,
  // 	selectOnFocus: PropTypes.bool,
  // 	className: PropTypes.string,
  // };

  constructor() {
    super(...arguments);
  }

  render() {
    return <input type="text" {...this.props} />;
  }
}
