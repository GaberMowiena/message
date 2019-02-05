import React from 'react';

const FormLabel = ({ children }) => {
  children = React.Children.toArray(children) || [];
  // if (required) {
  //   children.push(renderRequiredBadge(translate));
  // }

  // if (optional) {
  //   children.push(renderOptionalBadge(translate));
  // }

  return (
    <label
    // {...omit(extraProps, 'moment', 'numberFormat')}
    // className={classnames(className, 'form-label')}
    >
      {children}
    </label>
  );
};

export default FormLabel;
