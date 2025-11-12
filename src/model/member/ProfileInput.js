import { VALIDATOR_REQUIRE } from "../../util/validators";

export default {
  empStatus: {
    value: "",
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
  employer: {
    value: "",
    isValid: true,
    touched: false,
    validators: [],
  },
  primaryIndustry: {
    value: "none",
    isValid: true,
    validators: [],
  },
  isFormValid: false,
};
