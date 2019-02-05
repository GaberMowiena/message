import React from 'react';

const FormSectionHeading = ({ children, ...otherProps }) => {
  return <h3 {...otherProps}>{children}</h3>;
};

export default FormSectionHeading;
