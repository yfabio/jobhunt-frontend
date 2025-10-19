import { VALIDATOR_REQUIRE } from "../../util/validators";

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
    validators: [VALIDATOR_REQUIRE()],
  },
};
