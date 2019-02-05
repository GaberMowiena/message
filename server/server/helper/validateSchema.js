function validateSchema(validation, type) {
  let errors;

  if (!validation.valid) {
    errors = validation.errors.map(error => {
      switch (error.name) {
        case 'additionalProperties': {
          const immutableFields = {
            name: 1,
            email: 1,
            password: 1
          };
          if (immutableFields[error.argument]) {
            return `The field '${
              error.argument
            }' is immutable at this endpoint`;
          }
          return `'${error.argument}' is an invalid ${type} attribute`;
        }
        case 'pattern':
          return `The ${error.property
            .split('.')
            .pop()} field only supports letters and numbers`;
        default:
          return error.stack.replace(/"/g, "'").replace('instance.', '');
      }
    });

    return new Error('Fail');
  }

  return 'OK';
}

module.exports = validateSchema;
