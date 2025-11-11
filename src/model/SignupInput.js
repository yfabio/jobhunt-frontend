import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../util/validators";

export default {
  email: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  password: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_MINLENGTH(4)],
  },
  role: {
    value: "member",
    isValid: true,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  isFormValid: false,
};
