import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";

export default {
  title: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  company: {
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
  salary: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  hoursPerWeek: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  jobType: {
    value: "full-time",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  description: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  responsibilities: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  requirements: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE()],
  },
  contactEmail: {
    value: "",
    isValid: false,
    touched: false,
    validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
  },
};
