const Input = ({
  id,
  label,
  value,
  type = "text",
  onChange,
  onBlur = () => {},
  placeholder,
  isValid = false,
  message = "",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`block w-full pl-4 py-2 border outline-none rounded transition-colors duration-200 
          ${
            isValid ? "border-red-500 bg-red-100 placeholder:text-red-600" : ""
          }`}
        required
      />
      {isValid && <span className="text-red-500 text-sm">{message}</span>}
    </div>
  );
};

export default Input;
