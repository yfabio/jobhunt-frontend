import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../util/validators";

export default {
  email: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_EMAIL()],
  },
  password: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_MINLENGTH(4)],
  },
  isFormValid: false,
};
