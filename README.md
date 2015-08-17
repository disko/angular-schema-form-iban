# angular-schema-form-iban

``angular-schema-form-iban`` provides an IBAN (International Bank Account Number) schema form field for usage with angular-schema-form. It includes validation as well as a parser and a formater to display the IBAN in a human readable format in the view's form field and store it in a machine processabale format on the model.

## Usage

1. Define a schema node of type ``string``.
2. Define the corresponding form of type ``iban``.

```
schema = {
  'type': 'object',
  'title': 'Comment',
  'properties': {
    'iban': {
      'title': 'IBAN',
      'type': 'string'
    }
  },
  'required': ['iban']
};
form = [
  {
    key: 'iban',
    type: 'iban'
  }
];
```

## Example

See the included [example](example) folder.
