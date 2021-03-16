/* eslint-disable space-before-function-paren */

import {
  required,
  email,
  alpha,
  numeric,
  minLength,
  maxLength,
  maxValue,
  minValue,
  between
} from "vuelidate/lib/validators";

const alphaExtra = value => {
  if (value === "") {
    return true;
  }
  return /^[-.a-zA-Z\s]+$/g.test(value);
};
const alphaNumExtra = value => {
  if (value === "") {
    return true;
  }
  return /^[-.\w\s]+$/g.test(value);
};

export const PhoneNumber = value => {
  if (value === "") {
    return true;
  }
  return /(\([0-9][0-9][0-9]\)\s[0-9][0-9][0-9]\-[0-9][0-9][0-9][0-9])/.test(
    value
  );
};

export const DistinctUsername = param => value => {
  if (value === "") {
    return true;
  }
  return !param.includes(value);
};

export const DistinctEmail = param => value => {
  if (value === "") {
    return true;
  }
  return !param.includes(value);
};

export const ConfirmPassword = param => value => {
  console.log("In the validation function, param is: " + param);
  if (value === "") {
    return true;
  }
  return param === value;
};

export const ContainsCapitalLetter = value => {
  if (value == "") {
    return true;
  }
  return /[A-Z]/.test(value);
};

export const ContainsLowercaseLetter = value => {
  if (value == "") {
    return true;
  }
  return /[a-z]/.test(value);
};

export const ContainsNumber = value => {
  if (value == "") {
    return true;
  }
  return /\d/.test(value);
};

export const ContainsSpecialCharacter = value => {
  if (value === "") {
    return true;
  }
  return /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(value);
};
export const validPassword = value => {
  //ensures that input for password contains
  //one lowercase character
  //one uppercase character
  //one digit
  //one special character
  //at least 4 unique characters (this requirement will be met by extension of meeting the previous 4 requirements)
  //between 8 and 25 characters in length
  if (value === "") {
    return true;
  }
  return new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,25}$"
  ).test(value);
};
