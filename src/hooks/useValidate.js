import { useState, useReducer } from "react";

import { validate } from "../util/validators";

const formReducer = (state, action) => {
  let input;
  switch (action.type) {
    case "CHANGE":
      let isFormValid = true;
      input = state[action.name];
      input.value = action.value;
      input.isValid = validate(action.value, input.validators);
      if (input.isValid) {
        input.touched = false;
      }
      for (const key in state) {
        if (key !== "isFormValid") {
          if (key === action.name) {
            isFormValid = isFormValid && input.isValid;
          } else {
            isFormValid = isFormValid && state[key].isValid;
          }
        }
      }
      return {
        ...state,
        [action.name]: input,
        isFormValid,
      };
    case "TOUCH":
      input = state[action.name];
      input.touched = action.touched;
      return {
        ...state,
        [action.name]: input,
      };
    case "CLEAR":
      for (const key in state) {
        state[key].value = "";
        state[key].isValid = false;
        state[key].touched = false;
        state[key].validators = [];
      }
      return {
        ...state,
        isFormValid: false,
      };
    default:
      return state;
  }
};

const useValidate = (inputs) => {
  const [state, dispatch] = useReducer(formReducer, inputs);

  const formData = {};

  for (const key in state) {
    if (state[key].value) {
      formData[key] = state[key].value;
    }
  }

  return [state, dispatch, formData];
};

export default useValidate;
