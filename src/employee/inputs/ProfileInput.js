import { VALIDATOR_REQUIRE } from "../../util/validators";

export default {
  empStatus: {
    value: "employed",
    isValid: true,
    validators: [VALIDATOR_REQUIRE()],
  },
  firstName: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  lastName: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  jobTitle: {
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
  primaryIndustry: {
    value: "tech",
    isValid: true,
    validators: [VALIDATOR_REQUIRE()],
  },
  isFormValid: false,
};
