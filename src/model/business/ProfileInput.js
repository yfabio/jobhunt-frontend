import { VALIDATOR_REQUIRE } from "../../util/validators";

export default {
  name: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  industry: {
    value: "tech",
    isValid: true,
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
