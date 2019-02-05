import React from 'react';

const FormFieldSet = ({ children, ...otherProps }) => (
  <fieldset {...otherProps}>{children}</fieldset>
);

export default FormFieldSet;
