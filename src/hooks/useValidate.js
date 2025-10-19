import { validate } from "../util/validators";

const useValidate = (value, validators) => {
  const isValid = validate(value, validators);
  return isValid;
};

export default useValidate;
