const Input = ({
  id,
  label,
  value,
  type = "text",
  onChange,
  onBlur = () => {},
  placeholder,
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
        className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
        required
      />
    </div>
  );
};

export default Input;
