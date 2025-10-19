import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";

export default {
  email: {
    value: "yfabio@pop.com",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  password: {
    value: "123456",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_MINLENGTH(6)],
  },
};
