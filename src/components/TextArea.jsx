const TextArea = ({
  id,
  label,
  value,
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
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows="3"
        className={`block w-full pl-4 py-2 border outline-none  rounded transition-colors duration-200 
          ${
            isValid ? "border-red-500 bg-red-100 placeholder:text-red-600" : ""
          }`}
        required
      />
      {isValid && <span className="text-red-500 text-sm">{message}</span>}
    </div>
  );
};

export default TextArea;
