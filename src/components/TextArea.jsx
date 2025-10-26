const TextArea = ({
  id,
  label,
  value,
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
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows="3"
        className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-300"
        required
      />
    </div>
  );
};

export default TextArea;
