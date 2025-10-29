import { VALIDATOR_MINLENGTH } from "../../util/validators";

export default {
  currentPass: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_MINLENGTH(4)],
  },
  newPassword: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_MINLENGTH(4)],
  },
  reenterPassword: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_MINLENGTH(4)],
  },
  isFormValid: false,
};
