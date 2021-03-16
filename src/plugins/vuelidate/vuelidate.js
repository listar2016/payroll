export const messages = {
  required: "{attribute} is required.",
  requiredIfPhone: "Please provide at least one phone number.",
  phoneNumber: "Please enter a valid phone number.",
  email: "Please enter a valid email address.",
  distinctUsername: "This username is already taken.",
  distinctEmail:
    "There is already an account associated with this email address.",
  alpha: "{attribute} must only contain alphabet characters",
  numeric: "{attribute} must only contain numeric characters",
  minLength: "{attribute} requires min length",
  passwordLength:
    "Please choose a password that is at least eight characters long.",
  requiresCapital: "Password must contain at least one capital letter.",
  requiresLowercase: "Password must contain at least one lowercase letter",
  requiresNumber: "Password must contain at least one numeric character.",
  requiresSpecialCharacter:
    "Password must contain at least one special character.",
  passwordConfirmation: "Passwords must match",
  maxLength: "{attribute} exceeds max length",
  minValue: " {attribute} requires min length",
  maxValue: "{attribute} exceeds max value",
  between: "{attribute} out of bounds",
  alphaNum: "{attribute} must have just letters or numbers",
  alphaExtra: "{attribute} has invalid characters",
  alphaNumExtra: "{attribute} has invalid characters",
  alphaNumericHashtag: "{attribute} invalid",
  stateValid: "NY is the only valid state",
  validLength: "{attribute} has an invalid length",
  inArray: "please choose a valid value for {attribute}",
  unique: "{attribute} must be unique",
  minLengthTime: "end time must be later than the start time",
  dateOfActivityMinValue: "date of activity must be within 2 years"
};

export const attributes = {
  //maps field name to string and inserts string in place of {attribute} in error message
  nyeisid: "nyeisid"
};
