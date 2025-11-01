import { VALIDATOR_REQUIRE } from "../util/validators";

export default {
  search: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  location: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  isFormValid: false,
};
