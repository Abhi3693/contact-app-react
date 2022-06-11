import yup, { setLocale } from 'yup';

export default function validate(errors, name, value) {
  let errorMsg = '';

  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  switch (name) {
    case 'firstName':
      if (hasNumber(value)) {
        errorMsg = 'Numbers are not allowed';
      } else if (format.test(value)) {
        errorMsg = 'Symbols are not allowed';
      } else if (value.length < 3) {
        errorMsg = 'should contain 3 charachter';
      } else {
        errorMsg = '';
      }
      errors.firstName = errorMsg;
      break;

    case 'lastName':
      if (hasNumber(value)) {
        errorMsg = 'Numbers not allowed';
      } else if (format.test(value)) {
        errorMsg = 'Symbols are not allowed';
      } else if (value.length < 3) {
        errorMsg = 'should contain 3 charachter';
      } else {
        errorMsg = '';
      }
      errors.lastName = errorMsg;
      break;

    case 'phone':
      if (isNaN(value)) {
        errorMsg = 'should contain only number';
      } else if (String(value).length < 10 || String(value).length > 10) {
        errorMsg = 'should contain 10 charachter';
      } else {
        errorMsg = '';
      }
      errors.phone = errorMsg;
      break;

    default:
      break;
  }
}
