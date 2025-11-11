import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";

export default {
  email: {
    value: "yfabio@member.com",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  password: {
    value: "1234",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_MINLENGTH(4)],
  },
  isFormValid: false,
};
